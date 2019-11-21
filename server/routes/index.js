const Router = require('koa-router')
const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const router = new Router()

const serverBundle = require(path.resolve(__dirname, '../../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../../dist/index.ssr.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: template,
    clientManifest: clientManifest
});

router.get('*',async (ctx, next) => {
    let context = {
        url: ctx.url
    };

    const ssrStream = renderer.renderToStream(context);
    let html = ''
    ssrStream.on('data', data => {
        html += data.toString()
    })
    ssrStream.on('end',() => {
        console.log(html) // 渲染完成
    })
    ssrStream.on('error', err => {
        console.log(err)
    })
    ctx.status = 200;
    ctx.type = 'html';
    ctx.body = ssrStream;
    await next()
})

router.post('/data.json', async ctx => {
    ctx.status = 200;
    ctx.body = ctx.state.vipData
})

module.exports = router