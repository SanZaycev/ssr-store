import {api_actions} from "../core/actions.js";

export default http => ({
	async load(token) {
		const { data } = await http.get('cart.php', {
			params: { token },
			action: api_actions.CART_LOAD
		});
		return data
	},
	async add(token, id) {
		const { data } = await http.post('cart.php', { token, id },{
			action: api_actions.CART_ADD
		});
		return data
	},
	async remove(token, id) {
		const { data } = await http.delete('cart.php',{
			params: { token, id },
			action: api_actions.CART_REMOVE
		});
		return data
	},
	async change(token, id, cnt) {
		const { data } = await http.put('cart.php', { token, id, cnt }, {
			action: api_actions.CART_CHANGE
		});
		return data
	}
})
