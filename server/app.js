const Koa = require('koa')
const http = require('http')
const static = require('koa-static')
const Router = require('koa-router')
const getVip = require('./data/getVip')
const mongoose = require('./db')
const path = require('path')
const fs = require('fs')

const app = new Koa()
const router = new Router()

app.use(static(path.resolve(__dirname, '../dist')))


//在最外层中间件处理错误
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 响应用户
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = error.message;

        // 触发应用层级错误事件
        ctx.app.emit("error", error, ctx);
        console.log('捕获到错误：', error.message);
    }
});



// app.use(static(__dirname, 'public'))

// 响应时间输出中间件
app.use(async (ctx, next) => {
    console.log(__dirname)
    await next();
    // 获取响应头，印证执行顺序
    const rt = ctx.response.get('X-Response-Time');
    console.log(`输出计时：${ctx.method} ${ctx.url} - ${rt}`);
});



// 响应时间统计中间件
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('开始计时');
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('计时结束');
});



app.use(getVip)

//配置模板引擎
const hbs = require('koa-hbs')
app.use(hbs.middleware({
    viewPath: __dirname + '/views',//视图根目录
    defaultLayout: 'layout',//默认布局页面
    partialsPath: __dirname + '/views/partials',//设置partial目录
    disableCache: true //开发阶段不缓存
}))


//引入路由
const staticMiddleware = require('./routes/static')
const demo = require('./routes/demo')
const index = require('./routes/index')
// app.use(staticMiddleware.routes())
// app.use(demo.routes())
app.use(index.routes())
app.use(router.allowedMethods())



app.on('error', (err, ctx) => {
    console.error(err);
    // console.log('没得事')
    // throw err
})

app.listen(3000, () => {
    console.log('server listening 3000')
})

//浏览器渲染首页
const frontendApp = new Koa();
const frontendRouter = new Router();
frontendApp.use(static(path.resolve(__dirname, '../dist')));

frontendRouter.get('/index', (ctx, next) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = html;
});

frontendApp
    .use(frontendRouter.routes())
    .use(frontendRouter.allowedMethods());

frontendApp.listen(3001, () => {
    console.log('浏览器端渲染地址： http://localhost:3001');
});