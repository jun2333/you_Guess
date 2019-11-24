const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const base = require('./webpack.base.config')

module.exports = merge(base, {
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',

    //对 bundle renderer 提供 source map 支持
    devtool: '#source-map',
    entry: {
        server: path.resolve(__dirname, '../src/entry-server.js')
    },

    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: [nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 如果你导入依赖于 webpack 的任何其他类型的文件（例如 *.vue, *.sass），那么你也应该将它们添加到白名单中，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
    })],

    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [
        // 这是将服务器的整个输出
        // 构建为单个 JSON 文件的插件。
        // 默认文件名为 `vue-ssr-server-bundle.json`
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.ssr.html'),
            filename: 'index.ssr.html',
            favicon: path.resolve(__dirname, '../src/assets/img/favicon.ico'),
            files: {
                js: 'client.bundle.js'
            },
            excludeChunks: ['server']
        })
    ]
})