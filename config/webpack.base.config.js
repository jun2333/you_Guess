/*
 * @Descripttion: 
 * @version: 
 * @Author: chenjun
 * @Date: 2020-04-07 23:06:17
 * @LastEditors: chenjun
 * @LastEditTime: 2020-04-07 23:07:28
 */
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackplugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// CSS 提取应该只用于生产环境
// 这样我们在开发过程中仍然可以热重载
const resolve = (name) => path.resolve(__dirname, `../${name}`)

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src")
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            // 重要：使用 vue-style-loader 替代 style-loader
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000 // 10Kb
                    }
                }
            }
        ]
    },
    
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackplugin(),
        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css'
        }),
        // isProduction?new ExtractTextPlugin({ filename: 'common.[chunkhash].css' }):''
    ]
}
