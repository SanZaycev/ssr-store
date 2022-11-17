import {viewsDescriptions, viewsTitles} from "./state.js";
import routerNames from "../router/names.js";
import {isObject} from "../services/getters.js";


export default function connectPageMeta(context, store, router) {
    router.afterEach((to) => {
        const {
            title = viewsTitles.DEFAULT,
            description = viewsDescriptions.DEFAULT
        } = getPageMeta(to, store.state)

        store.dispatch('location/setMeta', { title, description })

        context.meta.title = title;
        context.meta.description = description

        if (context.appMounted) {
            setClientMeta(title, description)
        }
        if (process.__CLIENT__){ console.log("CONTEXT => ", context) }
    })
}


const getPageMeta = (route, state) => {
    const meta = {}
    switch (route.name) {
        case routerNames.ProductDetail:
            const product = state.products.items.find(p => p.id === Number.parseInt(route.params.id))
            console.log("getPageMeta product => ", product);
            if (!isObject(product)){
                setMeta404(meta, route)
            } else {
                meta.title =  product.title ?? viewsTitles.PRODUCT_DETAIL;
                meta.description = product.description ?? viewsDescriptions.PRODUCT_DETAIL;
            }
            break;
        case routerNames.Products:
            meta.title = `Динамический тайтл: ${viewsTitles.PRODUCTS}`;
            meta.description = `Динамическое описание: ${viewsDescriptions.PRODUCTS}`;
            break;
        default:
            const {title, description} = getStaticMeta(route.name)
            meta.title = title;
            meta.description = description
    }
    return meta
}


const setClientMeta = (title, description) => {
    if (process.__CLIENT__) {
        document.title = title;
        const meta_description = document.querySelector('meta[name="description"]')
        if (meta_description){ meta_description.setAttribute("content", description) }
    }
}


const setMeta404 = (pageMeta, route) => {
    if (Array.isArray(route.matched) && isObject(route.matched[0])){
        route.matched[0].meta.is404 = true
    }
    route.meta.is404 = true
    pageMeta.title = viewsTitles.E404
    pageMeta.description = viewsDescriptions.E404
}


const getStaticMeta = (routeName) => {
    switch (routeName) {
        case routerNames.Home:
            return {
                title: viewsTitles.HOME,
                description: viewsDescriptions.HOME
            }
        case routerNames.Login:
            return {
                title: viewsTitles.LOGIN,
                description: viewsDescriptions.LOGIN
            }
        case routerNames.Register:
            return {
                title: viewsTitles.REGISTER,
                description: viewsDescriptions.REGISTER
            }
        case routerNames.Products:
            return {
                title: viewsTitles.PRODUCTS,
                description: viewsDescriptions.PRODUCTS
            }
        case routerNames.Cart:
            return {
                title: viewsTitles.CART,
                description: viewsDescriptions.CART
            }
        case routerNames.Checkout:
            return {
                title: viewsTitles.CHECKOUT,
                description: viewsDescriptions.CHECKOUT
            }
        case routerNames.Office:
            return {
                title: viewsTitles.OFFICE,
                description: viewsDescriptions.OFFICE
            }
        case routerNames.OfficeOrders:
            return {
                title: viewsTitles.OFFICE_ORDERS,
                description: viewsDescriptions.OFFICE_ORDERS
            }
        case routerNames.Profile:
            return {
                title: viewsTitles.PROFILE,
                description: viewsDescriptions.PROFILE
            }
        case routerNames.ProfileSettings:
            return {
                title: viewsTitles.PROFILE_SETTINGS,
                description: viewsDescriptions.PROFILE_SETTINGS
            }
        case routerNames.About:
            return {
                title: viewsTitles.ABOUT,
                description: viewsDescriptions.ABOUT
            }
        case routerNames.E404:
            return {
                title: viewsTitles.E404,
                description: viewsDescriptions.E404
            }
        default:
            return {
                title: viewsTitles.DEFAULT,
                description: viewsDescriptions.DEFAULT
            }
    }
}
