import getApp from "./app.js";
/*import "./assets/fonts/all.css"
import "./assets/css/bootstrap.css"
import "./assets/css/theme.css"
import "./assets/css/media.css"*/

(async function(){
    const isSSR = window.hasOwnProperty('__SSR__')
    const context = {
        isSSR: isSSR,
        is404: false,
        isFirstSSR: isSSR,
        appMounted: false,
        ip: isSSR ? window.__SSR__.ip : null,
        asyncData: isSSR ? window.__SSR__.asyncData : [],
        appState: isSSR ? window.__SSR__.appState : {},
        meta: {
            title: undefined,
            description: undefined,
        }
    }
    const { app, router, store } = await getApp(context)
    router.isReady().then(() => {
        store.dispatch('cart/load')
        app.mount('#app')
        store.dispatch('user/autoLogin').then(logged => {
            if (!logged) {
                store.dispatch('user/clean');
                if (router.currentRoute.value.meta.isAuth) {
                    router.replace({name: "login"})
                }
            }
            store.dispatch('activateStore')
            context.appMounted = true
        })
    });
})();
