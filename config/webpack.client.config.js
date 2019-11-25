const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const base = require('./webpack.base.config')

module.exports = merge(base, {
    entry: {
        client: path.resolve(__dirname, '../src/entry-client.js')
    },
    plugins: [
        
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        new VueSSRClientPlugin(),
        /* // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
        // 以便可以在之后正确注入异步 chunk。
        // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
        // 如下写法被遗弃
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }), */
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html',
            favicon: path.resolve(__dirname, '../src/assets/img/favicon.ico'),
        })
    ],
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "manifest",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: '/',
        quiet: false,
        noInfo: false,
        open: true,
        hot: true,
        inline: true,
        lazy: false,
        progress: true,
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8080',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
})