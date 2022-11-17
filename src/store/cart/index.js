import initState from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';
import initActions from './actions.js';

export default cartApi => ({
	namespaced: true,
	state: initState(),
	getters,
	mutations,
	actions: initActions(cartApi)
});
