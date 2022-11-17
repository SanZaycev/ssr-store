import NProgress from '../libs/progress.js'

export const dispatchAsyncData = async (context, api, route) => {
    return new Promise(resolve => {
        const components = routeAsyncComponents(route)
        if (components.length) {
            progressStart();
            if (context.isFirstSSR) {
                context.isFirstSSR = false
                applyAsyncData(components, context.asyncData);
                progressDone(resolve);
                resolve(true)
            }
            else {
                Promise.all(components.map(cmp => cmp.asyncData(api, route.params))).then(data => {
                    context.asyncData = data
                    applyAsyncData(components, context.asyncData);
                    progressDone(resolve);
                    resolve(true)
                })
            }
        } else {
            resolve(false)
        }
    })
}

const routeAsyncComponents = (route) => {
    return route.matched.flatMap(r => Object.values(r.components)).filter(cmp => 'asyncData' in cmp);
}

const applyAsyncData = (components, contextAsyncData) => {
    components.forEach((cmp, i) => {
        const nativeData = cmp.data;
        cmp.data = function(){
            const syncData = nativeData.call(this);
            const asyncData = contextAsyncData[i];
            cmp.data = nativeData;
            return { ...syncData, ...asyncData }
        }
    });
}

const progressStart = () => {
    if (process.__CLIENT__ && typeof NProgress !== "undefined"){ NProgress.start(); }
}

const progressDone = () => {
    if (process.__CLIENT__ && typeof NProgress !== "undefined"){ NProgress.done() }
}
