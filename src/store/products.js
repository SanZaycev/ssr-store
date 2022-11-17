import {parseArrays} from "../services/setters.js";

export default productsApi => ({
	namespaced: true,
	state: {
		items: []
	},
	getters: {
		all: state => state.items,
		one: state => id => state.items.find(p => p.id === id),
	},
	mutations: {
		setItems(state, items){
			state.items = items;
		},
		parse(state, items){
			parseArrays(state.items, items)
		}
	},
	actions: {
		async load({ commit }){
			try {
				const products = await productsApi.all();
				commit('setItems', products);
			} catch (e) {
				console.warn("products/load fail => ", e.message)
			}
		},
		parse({commit}, products){
			commit('parse', products);
		},
		set({commit}, products){
			commit('setItems', products);
		}
	}
})
