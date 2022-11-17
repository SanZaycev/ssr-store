import {isObject} from "../services/getters.js";
import {cleanTokensData, getAccessToken, getJWTPayload, setTokens} from "../services/tokens.js";


export default authApi => ({
	namespaced: true,
	state: {
		user: null,
	},
	getters: {
		name: state => isObject(state.user) ? state.user.name : "",
		isAuthenticated: state => state.user && typeof state.user !== "undefined",
		checkRole: state => allowedRoles => state.user !== null && allowedRoles.some(role => state.user.roles.includes(role))
	},
	mutations: {
		login(state, user) {
			if (isObject(user)) {
				state.user = user
				if (process.__CLIENT__){ console.log("USER =>", state.user) }
			}
		},
		logout(state) {
			console.log("User logout")
			state.user = null
		},
	},
	actions: {
		async autoLogin({ commit }) {
			return new Promise(async resolve => {
				const { res } = await authApi.check()
				if (res) {
					const { login, name, roles } = getJWTPayload(getAccessToken());
					commit('login', { login, name, roles });
					resolve(true)
				}
				resolve(false)
			})
		},
		async login({ commit }, { login, password }) {
			const data = await authApi.login(login, password)
			if (!isObject(data)) {
				return { errors: ['Сервер занят или не отвечает. Попробуйте обновить страницу.'] }
			} else if (data.res) {
				setTokens(data.accessToken);
				const { login, name, roles } = getJWTPayload(data.accessToken);
				commit('login', { login, name, roles });
			}
			return data
		},
		async logout({ dispatch }){
			const res = await authApi.logout();
			if (res) { dispatch('clean') }
			return res;
		},
		async cleanLogin({dispatch}){
			//await dispatch('clean')
			await dispatch('autoLogin').then(loggedIn => {
				console.log("loggedIn => ", loggedIn)
				if (!loggedIn){ dispatch('clean') }
			})
			return Promise.resolve()
		},
		clean({ commit }){
			cleanTokensData();
			commit('logout');
		}
	}
})
