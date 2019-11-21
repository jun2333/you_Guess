const Router = require('koa-router')
const router = new Router()
const mime = require('mime')
const fs = require('fs-extra')
const crypto = require('crypto')


//协商缓存(两个字段只能使用一个)
//获取和设置etag字段
const compareEtag = async (ctx, path, codding) => {
    const ifNoneMatch = ctx.headers['if-none-match'];
    const hash = crypto.createHash('md5');
    const content = await fs.readFile(`public/${path}`, codding);
    hash.update(content);
    const etag = `${hash.digest('hex')}`;
    return { ifNoneMatch, etag, content }
}
//获取和设置lastmodified字段
const compareLastModified = async (ctx, path, codding) => {
    const content = await fs.readFile(`public/${path}`, codding);
    const ifModifiedSince = ctx.headers['if-modified-since'];
    const fileStatus = await fs.stat(`public/${path}`);
    const lastModified = fileStatus.mtime.toGMTString();
    return { ifModifiedSince, lastModified, content }
}

router.get(/(^\/index(.html)?$)|(^\/$)/, async (ctx, next) => {
    const { path } = ctx;
    ctx.type = mime.getType('.html');
    let { ifNoneMatch, etag, content } = await compareEtag(ctx, path, 'UTF-8');
    if (ifNoneMatch === etag) {
        console.log('缓存页面');
        ctx.status = 304;
    } else {
        // ctx.lastModified = lastModified;
        ctx.set('etag', etag);
        ctx.body = content;
    }
    await next();
});

// 处理图片
router.get(/\S*\.(jpe?g|png)$/, async (ctx, next) => {
    const { path } = ctx;
    ctx.type = mime.getType(path);
    let { ifNoneMatch, etag, content } = await compareEtag(ctx, path);
    if (ifNoneMatch === etag) {
        console.log('缓存图片');
        ctx.status = 304;
    } else {
        // ctx.lastModified = lastModified;
        ctx.set('etag', etag);
        ctx.body = content;
    }
    await next();
});

// 处理 css 文件
router.get(/\S*\.css$/, async (ctx, next) => {
    const { path } = ctx;
    ctx.type = mime.getType(path);
    // ctx.set('expires', new Date(Date.now() + 20 * 1000).toString());
    // ctx.set('cache-control','max-age=40')//优先级比expire高

    let { ifNoneMatch, etag, content } = await compareEtag(ctx, path, 'UTF-8')
    if (ifNoneMatch === etag) {
        console.log('缓存css');
        ctx.status = 304;
    } else {
        // ctx.lastModified = lastModified;
        ctx.set('etag', etag);
        ctx.body = content;
    }


    await next();
});

module.exports = router