const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const server = express();
const port = 3000;
const clientManifest = require('./dist/client.json');
const initServerBundle = require('./dist/js/server-bundle.js');
const LRU = require('lru-cache');
const pagesCache = new LRU({ max: 100, maxAge: 30 * 1000 }); // 1s * 1000ms * 30 // max - кол-во записей // maxAge - 30 минут

server.use(compression())
server.use('/css/', express.static(path.resolve(__dirname, './dist/css/')));
server.use('/fonts/', express.static(path.resolve(__dirname, './dist/fonts/')));
server.use('/js/', express.static(path.resolve(__dirname, './dist/js/')));
server.use('/img/', express.static(path.resolve(__dirname, './dist/img/')));
server.use('/favicon.ico', express.static(path.resolve(__dirname, './dist/favicon.ico')));
server.use('/manifest.json', express.static(path.resolve(__dirname, './dist/manifest.json')));

const serverManager = {
    getIp(request) {
        return request.socket.remoteAddress || request.headers['x-forwarded-for'] || "127.0.0.1"
    },
    initialContext(request) {
        return {
            url: request.url,
            ip: this.getIp(request),
            ...defaultContext
        }
    }
}

server.get('*', function (request, response){
    if (pagesCache.has(request.url)) {
        console.log(request.url + ' - get from cache');
        response.status(200).end(pagesCache.get(request.url));
        return;
    }
    const context = serverManager.initialContext(request)
    console.log("__SERVER__ GET CONTEXT => ", context);
    renderPage(context).then(({code, page}) => {
        if (code === 200){ pagesCache.set(context.url, page) }
        response.status(code).end(page)
    }).catch(err => {
        console.log("__SERVER__ GET ERROR => ", err);
        server.use('/500.html', express.static(path.resolve(__dirname, './dist/500.html')));
        response.status(500).end(fs.readFileSync('./dist/500.html', 'utf-8'))
    })
});

const renderPage = async (initialContext) => {
    try {
        const {
            html = "",
            context = { ...defaultContext }
        } = await initServerBundle(initialContext)
        return {
            code: statusCode(context.is404),
            page: htmlTemplate({
                meta: pageTitle(context.meta.title) + pageDescription(context.meta.description) + pwaMeta(),
                head: fontsCss() + headCss(),
                foot: pageJs() + footCss(),
                context: context.isSSR ? pageContext(context) : "",
                html: context.isSSR ? html : "",
            })
        }
    } catch(err) {
        return Promise.reject(err)
    }
}

const htmlTemplate = (params) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            ${params.meta}
            ${params.head}
        </head>
        <body>
            <div id="app">${params.html}</div>
            ${params.context}
            ${params.foot}
        </body>
    </html>`
}

const defaultContext = {
    isSSR: false,
    is404: false,
    asyncData: [],
    appState: {},
    meta: {
        title: undefined,
        description: undefined,
    }
}

const statusCode = (is404) => {
    return !is404 ? 200 : 404
}

const pwaMeta = () => {
    return '<!--[if IE]><link rel="icon" href="/favicon.ico"><![endif]--><link rel="icon" type="image/png" sizes="32x32" href="/img/icons/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/img/icons/favicon-16x16.png"><link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#4DBA87"><meta name="apple-mobile-web-app-capable" content="no"><meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="apple-mobile-web-app-title" content="ssr-store"><link rel="apple-touch-icon" href="/img/icons/apple-touch-icon-152x152.png"><link rel="mask-icon" href="/img/icons/safari-pinned-tab.svg" color="#4DBA87"><meta name="msapplication-TileImage" content="/img/icons/msapplication-icon-144x144.png"><meta name="msapplication-TileColor" content="#000000">'
}

const pageTitle = (title) => {
    return typeof title === "string" && title.trim() !== "" ? `<title>${title}</title>` : `<title>Тайтл Продукты и товары | SSR Store</title>`
}

const pageDescription = (description) => {
    return typeof description === "string" && description.trim() !== "" ? `<meta name="description" content="${description}">` : `<meta name="description" content="Дескриптион Описание продукты и товары | SSR Store">`
}

const pageContext = (context) => {
    return typeof context === "object" && context !== null ? `<script id="ussr">window.__SSR__ = ${JSON.stringify(context)}</script>` : ""
}

const fontsCss = () => {
    return "fonts" in clientManifest
        ? clientManifest.fonts.map((file) => { return `<link rel="stylesheet" href="${file}">` }).join("")
        : ""
}

const headCss = () => {
    return "head" in clientManifest
        ? clientManifest.head.map((file) => { return `<style>${fs.readFileSync('./dist/' + file)}</style>` }).join("")
        : ""
}

const footCss = () => {
    return "foot" in clientManifest
        ? clientManifest.foot.map((file) => { return `<link rel="stylesheet" href="${file}">` }).join("")
        : ""
}

const pageJs = () => {
    return "js" in clientManifest
        ? clientManifest.js.map((file) => { return `<script src="${file}"></script>` }).join("")
        : ""
}

server.listen(port);
console.log(`server start on port: ${port} ...`);
