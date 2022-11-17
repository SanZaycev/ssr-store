export default ordersApi => ({
    namespaced: true,
    state: {
        orders: []
    },
    getters: {
        all: state => state.orders
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders
        }
    },
    actions: {
        async setOrders({ commit }) {
            try {
                const orders = await ordersApi.all();
                commit('setOrders', orders);
            } catch (e) {
                console.warn(e.message)
            }
        }
    }
})
