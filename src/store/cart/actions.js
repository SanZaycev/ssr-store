export default cartApi => ({
	async load({ commit }){
		try {
			const savedToken = localStorage.getItem('cartToken');
			const { token, needUpdate, cart } = await cartApi.load(savedToken);
			if (needUpdate){ localStorage.setItem('cartToken', token) }
			commit('set', { cart, token });
		} catch (e) {
			console.warn(e.message)
		}
	},
	async add({ state, getters, commit }, { id }){
		if (getters.canAdd(id)){
			commit('startProccess', id);
			const res = await cartApi.add(state.token, id)

			if (res) {
				commit('add', { id });
			}

			commit('endProccess', id);
		}
	},
	async remove({ state, getters, commit }, { id }){
		if (getters.canUpdate(id)){
			commit('startProccess', id);
			const res = await cartApi.remove(state.token, id)

			if (res) {
				commit('remove', { ind: getters.index(id) });
			}

			commit('endProccess', id);
		}
	},
	async setCnt({ state, getters, commit, dispatch }, { id, cnt }){
		if(getters.canUpdate(id)){
			commit('startProccess', id);
			const validCnt = Math.max(1, cnt);
			const res = await cartApi.change(state.token, id, validCnt)

			if (res === true) {
				commit('setCnt', { ind: getters.index(id), cnt: validCnt });
			}

			commit('endProccess', id);
		}
	}
})
