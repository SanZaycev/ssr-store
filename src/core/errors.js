import {api_actions} from "./actions.js";
import {errorsText} from "./state.js";
import {isObject} from "../services/getters.js";


export default function connectErrors(http, store, router){
    http.interceptors.response.use(
res => res,
async function (error) {
            const config = getErrorConfig(error)
            if (!config) {
                dispatchConfigError(store)
                return Promise.reject(error)
            }
            switch (true) {
                case is401Error(error):
                    dispatch401(config, store, router)
                    break;
                case is404Error(error):
                    dispatch404(store)
                    break;
                case is500Error(error):
                    dispatch500(store)
                    break;
                default:
                    dispatchByDefault(config, store)
            }
            return Promise.reject(error)
        }
    );
}


const dispatchByDefault = (config, store) => {
    const action = config.hasOwnProperty('action') ? config.action : api_actions.DEFAULT
    store.dispatch('alerts/add', dispatchError(action))
}


const getErrorConfig = (error) => {
    if (isObject(error)) {
        if (error.hasOwnProperty('config')) {
            return error.config
        }
        else if (isObject(error.response) && error.response.hasOwnProperty('config')) {
            return error.response.config
        }
    }
    return null
}


const dispatchConfigError = (store) => {
    store.dispatch('alerts/add', dispatchError(api_actions.SERVER_ERROR))
}


const dispatch401 = (config, store, router) => {
    if (config.silence401) { return false }
    store.dispatch('user/clean').then(() => {
        if (process.__CLIENT__) {
            router.push({ name: 'login', query: { to: router.currentRoute.value.path }})
            //.then(() => location.reload()))
        }
        return store.dispatch('alerts/add', dispatchError(api_actions.UNAUTHORIZED))
    })
}


const dispatch404 = (store) => {
    store.dispatch('alerts/add', dispatchError(api_actions.SERVER_404))
}


const dispatch500 = (store) => {
    store.dispatch('alerts/add', dispatchError(api_actions.SERVER_500))
}


const dispatchError = (action) => {
    const error = {
        text: errorsText.DEFAULT_ALERT,
        type: "w-error",
        time: 5000,
        closable: true,
        position: "top-right",
        is_critical: false
    }
    switch (action) {
        case api_actions.CART_LOAD:
            error.text = errorsText.CART_LOAD;
            error.time = 9999999;
            error.closable = false;
            error.is_critical = true
            break;
        case api_actions.CART_ADD:
            error.text = errorsText.CART_ADD;
            break;
        case api_actions.CART_REMOVE:
            error.text = errorsText.CART_REMOVE;
            break;
        case api_actions.CART_CHANGE:
            error.text = errorsText.CART_CHANGE;
            break;
        case api_actions.PRODUCTS_ALL:
            error.text = errorsText.PRODUCTS_ALL;
            error.time = 9999999;
            error.closable = false;
            error.is_critical = true
            break;
        case api_actions.PRODUCT_RATING:
            error.text = errorsText.PRODUCT_RATING;
            break;
        case api_actions.PRODUCT_MARK:
            error.text = errorsText.PRODUCT_MARK;
            break;
        case api_actions.ORDERS_ALL:
            error.text = errorsText.ORDERS_ALL;
            break;
        case api_actions.LOGIN:
            error.text = errorsText.LOGIN;
            break;
        case api_actions.LOGOUT:
            error.text = errorsText.LOGOUT;
            break;
        case api_actions.UNAUTHORIZED:
            error.text = errorsText.UNAUTHORIZED;
            error.type = "w-info";
            break;
        case api_actions.SERVER_ERROR:
            error.text = errorsText.SERVER_ERROR;
            error.time = 9999999;
            error.closable = false;
            error.is_critical = true
            break;
        case api_actions.SERVER_404:
            error.text = errorsText.SERVER_404
            break;
        case api_actions.SERVER_500:
            error.text = errorsText.SERVER_500
            error.time = 9999999;
            error.closable = false;
            error.is_critical = true
            break;
        default: break;
    }
    return error
}


export const is401Error = (error) => {
    return isObject(error) && error.response && error.response.status === 401
}

export const is404Error = (error) => {
    return isObject(error) && error.response && error.response.status === 404
}

export const is500Error = (error) => {
    return isObject(error) && error.response && error.response.status === 500
}
