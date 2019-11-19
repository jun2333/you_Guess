const Koa = require('koa')
const http = require('http')
const app = new Koa({proxy:true})
const static = require('koa-static')
const getVip = require('./data/getVip')
const mongoose = require('./db')


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



app.use(static(__dirname, 'public'))

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

/* const sleep = time => new Promise(resolve => setTimeout(resolve, time))



//响应
app.use(async ctx => {
    console.log('响应用户请求');
    await sleep(1000)
    ctx.status = 200; // 设置响应状态码
    ctx.render('index')
}); */

const hbs = require('koa-hbs')
app.use(hbs.middleware({
    viewPath: __dirname + '/views',//视图根目录
    defaultLayout: 'layout',//默认布局页面
    partialsPath: __dirname + '/views/partials',//设置partial目录
    disableCache: true //开发阶段不缓存
}))



const index = require('./routes/index')
const staticMiddleware = require('./routes/static')
app.use(index.routes())
app.use(staticMiddleware.routes())


app.on('error', (err, ctx) => {
    console.error(err);
    // console.log('没得事')
    // throw err
})

http.createServer(app.callback()).listen(3000)
/* app.listen(3000, () => {
    console.log('server listening 3000')
}) */