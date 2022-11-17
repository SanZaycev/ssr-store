import routerNames from "../router/names";

export const api_actions = {
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
    PRODUCTS_ALL: "products/all",
    PRODUCT_RATING: "product/rating",
    PRODUCT_MARK: "product/mark",
    ORDERS_ALL: "orders/all",
    CART_LOAD: "cart/load",
    CART_ADD: "cart/add",
    CART_REMOVE: "cart/remove",
    CART_CHANGE: "cart/change",
    UNAUTHORIZED: "user/unauthorized",
    SERVER_ERROR: "server/error",
    SERVER_500: "server/error:500",
    SERVER_404: "server/error:404",
    DEFAULT: "default-api-action"
}


export const view_actions = {
    HOME: "HOME_VIEW",
    AUTH: "AUTH_VIEW",
    PRODUCTS: "PRODUCTS_VIEW",
    PRODUCT_DETAIL: "PRODUCTS_VIEW",
    CART: "CART_VIEW",
    CHECKOUT: "CART_VIEW",
    OFFICE: "OFFICE_VIEW",
    OFFICE_ORDERS: "OFFICE_VIEW",
    PROFILE: "PROFILE_VIEW",
    PROFILE_SETTINGS: "PROFILE_VIEW",
    ABOUT: "ABOUT_VIEW",
    DEFAULT: "DEFAULT_VIEW",
}


export const getActiveView = (routeName) => {
    switch (routeName) {
        case routerNames.Home: return view_actions.HOME
        case routerNames.Login: return view_actions.AUTH
        case routerNames.Register: return view_actions.AUTH
        case routerNames.Products: return view_actions.PRODUCTS
        case routerNames.ProductDetail: return view_actions.PRODUCT_DETAIL
        case routerNames.Cart: return view_actions.CART
        case routerNames.Checkout: return view_actions.CHECKOUT
        case routerNames.Office: return view_actions.OFFICE
        case routerNames.OfficeOrders: return view_actions.OFFICE_ORDERS
        case routerNames.Profile: return view_actions.PROFILE
        case routerNames.ProfileSettings: return view_actions.PROFILE_SETTINGS
        case routerNames.About: return view_actions.ABOUT
        default: return view_actions.DEFAULT
    }
}
