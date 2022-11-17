export default () => ({
	namespaced: true,
	state: {
		messages: [],
		lastAI: 0,
	},
	getters: {
		all: state => state.messages,
	},
	mutations: {
		add (state, payload){
			const alertObj = { id: ++state.lastAI, ...payload }
			state.messages.push(alertObj);
		},
		remove (state, id) {
			state.messages = state.messages.filter(m => m.id !== id)
		}
	},
	actions: {
		add ({ commit, state }, payload){
			commit('add', payload);
			const { lastAI } = state;
			setTimeout(() => commit('remove', lastAI), payload.time ? payload.time : 5000)
		},
		remove ({ commit }, id){
			commit('remove', id);
		}
	}
})
