export default {
	productsDetail(state, getters, rootState, rootGetters){
		return state.products.map(p => {
			const { title, price } = rootGetters['products/one'](p.id);
			return {
				...p,
				title,
				price
			}
		});
	},
	totalSum(state, getters){
		return getters.productsDetail.reduce((total, p) => {
			return total + p.price * p.cnt;
		}, 0);
	},
	totalCnt: state => state.products.length,
	inProccess: state => id => state.proccessId.includes(id),
	canAdd: (state, getters) => id => !getters.inCart(id) && !getters.inProccess(id),
	canUpdate: (state, getters) => id => getters.inCart(id) && !getters.inProccess(id),
	inCart: (state, getters) => id => getters.index(id) !== -1,
	index: state => id => state.products.findIndex(pr => pr.id === id),
	item: (state, getters) => id => {
		const ind = getters.index(id);
		return ind === -1 ? null : state.products[ind];
	},
	itemCnt: (state, getters) => id => getters.item(id).cnt,
}
