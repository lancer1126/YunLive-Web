const webpack = require('webpack')
const timestamp = new Date().getTime()

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            })
        ],
        output: {
            filename: `[name].${timestamp}.js`,
            chunkFilename: `[name].${timestamp}.js`
        }
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: '8081',
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8015',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}