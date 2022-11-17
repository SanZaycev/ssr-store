import {createStore} from 'vuex'
import initNewUser from "./user.js";
import initNewProducts from "./products.js";
import initNewOrders from "./orders.js";
import initNewCart from "./cart/index.js";
import initNewLocation from "./location.js";
import initNewAlerts from "./alerts.js";
import {view_actions, getActiveView} from "../core/actions.js";


export default function initStore(api) {
    const user = initNewUser(api.auth)
    const products = initNewProducts(api.products)
    const orders = initNewOrders(api.orders)
    const cart = initNewCart(api.cart)
    const location = initNewLocation()
    const alerts = initNewAlerts()
    return createStore({
        state: {
            fetching: false,
            activated: false,
            activeView: view_actions.DEFAULT
        },
        getters: {
            activeView: state => state.activeView,
            isFetching: state => state.fetching,
            isStoreReady: state => state.activated,
        },
        mutations: {
            activateStore(state) {
                state.activated = true
                console.log("STATE => ", state)
            },
            fetchingStart(state) {
                state.fetching = true
            },
            fetchingDone(state) {
                state.fetching = false
            },
            setActiveView(state, view) {
                state.activeView = view
                console.log("Store new view =>", view)
            },
        },
        actions: {
            activateStore({ commit }) {
                commit('activateStore')
            },
            fetchingStart({commit}) {
                commit('fetchingStart')
            },
            fetchingDone({commit}) {
                commit('fetchingDone')
            },
            setActiveView({commit}, name) {
                const view = getActiveView(name)
                commit('setActiveView', view)
            },
            fetchingTimeout({commit}, timeout) {
                commit('fetchingStart')
                setTimeout(() => commit('fetchingDone'), timeout)
            },
        },
        modules: {
          user,
          products,
          orders,
          cart,
          location,
          alerts,
        },
        strict: process.env.NODE_ENV !== "production"
    })
}
