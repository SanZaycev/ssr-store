import {renderToString} from "@vue/server-renderer";
import getApp from "./app.js";


export default async function initServerBundle(context){
    return new Promise(async (resolve, reject) => {
        try {
            if (!isUrl(context.url)){ reject ({ code: 500, message: "url is undefined" }) }

            const { app, router, store } = await getApp(context)

            await router.push(context.url)

            const html = context.isSSR ? await renderToString(app) : ""

            resolve({
                html,
                context: {
                    ...context,
                    appState: store.state
                }
            })
        } catch (err) {
            console.log("entry-server catch error =>", err)
            reject(err)
        }
    })
}


const isUrl = (url) => {
    return url && typeof url === "string" && url.trim() !== ""
}
