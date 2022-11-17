import { createApp, createSSRApp } from "vue";
import App from "./App.vue";
import initHttp from "./api/http.js";
import initApi from "./api/index.js";
import initStore from "./store/index.js";
import initRouter from "./router/index.js";
import connectTokens from "./core/tokens.js";
import connectErrors from "./core/errors.js";
import connectPageMeta from "./core/pagemeta.js";
import {initialUser} from "./core/state";


async function getApp(context) {
    try {
        let app;
        const http = await initHttp()
        const api = await initApi(http)
        const store = await initStore(api)
        const router = await initRouter(context, api, store)

        connectTokens(http)
        connectErrors(http, store, router)
        connectPageMeta(context, store, router)

        await store.commit('user/login', initialUser)

        if (process.__CLIENT__) {
            if (context.isSSR) {
                await store.replaceState(context.appState)
                cleanSSR()
            } else {
                await store.dispatch('products/load')
            }
            app = createUniversalApp(api, store, router, context.isSSR)
            console.log("app => get client app ...")
        }
        else {
            await store.dispatch('products/load')
            app = createUniversalApp(api, store, router, true)
            console.log("app => get server app ...")
        }
        return { app, router, store }
    }
    catch(err) {
        console.log("app.js reject error => ", err.message)
        return Promise.reject(err)
    }
}

const createUniversalApp = (api, store, router, isSSR) => {
    const universalApp = isSSR ? createSSRApp : createApp;
    const app = universalApp(App)
    app.config.globalProperties.$api = api;
    return app.use(store).use(router);
}

const cleanSSR = () => {
    if (window && window.hasOwnProperty('__SSR__')) {
        delete window.__SSR__
    }
    if (document) {
        const ussr = document.getElementById('ussr')
        if (ussr) { ussr.remove() }
    }
}


export default getApp;
