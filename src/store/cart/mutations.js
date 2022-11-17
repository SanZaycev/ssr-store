import {isArray, isEmptyString} from "../../services/getters.js";

export default {
	set(state, { cart, token }) {
		if (isArray(cart)){
			state.products = cart;
		}
		if (!isEmptyString(token)) {
			state.token = token;
		}
	},
	add(state, { id }){
		state.products.push({ id, cnt: 1 });
	},
	remove(state, { ind }){
		state.products.splice(ind, 1);
	},
	setCnt(state, { ind, cnt }){
		state.products[ind].cnt = cnt;
	},
	startProccess(state, id){
		state.proccessId.push(id);
	},
	endProccess(state, rid){
		state.proccessId = state.proccessId.filter(id => id !== rid);
	}
}
