const isServer = process.argv.includes('--server');
const webpackNodeExternals = require('webpack-node-externals');

console.log("Process isServer => ", isServer);


const configChainWebpack = isServer
    ? config => {
        config.plugins
        .delete('pwa')
        .delete('html')
        .delete('preload')
        .delete('prefetch')
    }
    : config => {
        config.plugins.delete('preload').delete('prefetch')
        config.plugin('html').tap(args => {
            args[0].minify = false;
            return args;
        })
    }


const chainWebpack = config => {
    config.plugin('define').tap(options => {
        options[0]['process.__CLIENT__'] = !isServer;
        options[0]['process.__SERVER__'] = isServer;
        return options;
    });
    configChainWebpack(config);
}


const configureWebpack = isServer
    ? {
        target: 'node',
        entry: { app: './src/entry-server.js' },
        output: {
            filename: 'js/server-bundle.js',
            library: '__MODULE_DEFAULT_EXPORT__',
            libraryTarget: 'commonjs2',
            libraryExport: 'default'
        },
        optimization: {
            splitChunks: false
        },
        externals: [webpackNodeExternals()]
    }
    : {
        entry: { app: './src/entry-client.js' }
    }


module.exports = {
    filenameHashing: false,
    productionSourceMap: false,
    chainWebpack,
    configureWebpack
}
