const Router = require('koa-router')
const path = require('path');
const fs = require('fs');
const jwtKoa = require('koa-jwt');
const secret = require('../secret');
const getVip = require('../data/getVip') 
const {
    createBundleRenderer
} = require('vue-server-renderer');
const router = new Router()

const serverBundle = require(path.resolve(__dirname, '../../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../../dist/index.ssr.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
    basedir: path.resolve(__dirname, './dist'),
    runInNewContext: false, //推荐
    template: template, //页面模板(可选)
    clientManifest: clientManifest //客户端构建manifest(可选)
});

//流式渲染
const renderToString = function (context) {
    return new Promise((resolve, reject) => {
        const ssrStream = renderer.renderToStream(context);
        let html = '';
        ssrStream.on('data', data => {
            html += data.toString()
        })
        ssrStream.on('end', () => {
            console.log(html); // 渲染完成
            resolve(html)
        })
        ssrStream.on('error', err => {
            // console.log(err)
            reject(err)
        })
    });
}

router.get('*', async (ctx, next) => {
    let context = {
        url: ctx.url
    };
    /* if(ctx.url=='/foo'){
        //此页面服务器渲染获取不到数据，原因未知，先行重定向到首页
        console.log('重定向');
        ctx.redirect('/');
        return
    } */
    try {
        let html = await renderToString(context);
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = html;
    } catch (e) {
        console.log('渲染错误', e);
        ctx.status = 500;
        ctx.body = e;
    }
})

router.post('/data.json', jwtKoa({ secret }), getVip)

module.exports = router