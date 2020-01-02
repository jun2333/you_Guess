const Koa = require('koa');
const app = new Koa();
const router = require('./routes/index.js');
const Static = require('koa-static');
const path = require('path');
const responseMiddleware = require('./middleware/response');
const authMiddleware = require('./middleware/auth');
const logMiddleware = require('./middleware/log');
const crossMiddleware = require('./middleware/cross');
const koaBody = require('koa-body');
const config = require('./config');
const session = require('koa-session');
const redisStore = require('koa-redis');
const wrapper = require('co-redis')
const redis = require('redis');
const redisClient = redis.createClient(6379, 'localhost');

app.keys = [config.keys];

redisClient.auth(config.redisConf.options.auth_pass);
const client = wrapper(redisClient);

config.SESS_CONFIG.store = redisStore({ client });//使用redis存储session


//错误日志
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.app.emit('error', err, ctx);
        console.log(err);
    }
});

//请求日志
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    ctx.response.set('X-Response-Time', `${ms}ms`);
})

app.use(session(config.SESS_CONFIG, app));//session

app.use(koaBody(config.uploadConf));//koa-body

app.use(Static(path.join(__dirname, '/public')));//静态资源中间件

app.use(logMiddleware);//请求日志中间件

app.use(responseMiddleware());//封装返回格式中间件

app.use(crossMiddleware(config.crossConf));//跨域配置中间件

app.use(authMiddleware);//验证登录中间件

app.use(router.routes());//路由中间件

//监听错误
app.on('error', (err,ctx) => {
    console.log('小问题没得事:',err);
    // ctx.throw(err);
})


module.exports = app;