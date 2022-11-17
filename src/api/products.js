import {api_actions} from "../core/actions.js";

export default http => ({
	async all(){
		const { data } = await http.get('products.php', {
			action: api_actions.PRODUCTS_ALL
		});
		return data
	},
	async rating(id){
		let { data } = await http.get('ratings.php', {
			params: { id },
			action: api_actions.PRODUCT_RATING
		});
		return { res: true, data: data };
	},
	async mark(id, mark){
		let { data } = await http.put('ratings.php', { id, mark }, {
			action: api_actions.PRODUCT_MARK
		});
		return data;
	}
})
