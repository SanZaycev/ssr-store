import {api_actions} from "../core/actions.js";

export default http => ({
	async all(){
		const { data } = await http.get('orders.php', {
			action: api_actions.ORDERS_ALL
		});
		return data
	}
})
