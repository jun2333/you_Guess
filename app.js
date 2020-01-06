const Koa = require('koa');
const http = require('http');
const chatControler = require('./controlers/chat');
const app = new Koa();
const router = require('./routes/index.js');
const Static = require('koa-static');
const path = require('path');
const { logger, accessLogger } = require('./logger.js');
const responseMiddleware = require('./middleware/response');
const authMiddleware = require('./middleware/auth');
const logMiddleware = require('./middleware/log');
const crossMiddleware = require('./middleware/crossorigin');
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

app.use(accessLogger());//访问日志中间件

//错误捕获
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.app.emit('error', err, ctx);
    }
});

app.use(logMiddleware);//请求日志中间件

//请求日志
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    logger.info(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    if (global.log) {
        global.log.time = `${ms}ms`;
    }
    ctx.response.set('X-Response-Time', `${ms}ms`);
})

app.use(session(config.SESS_CONFIG, app));//session

app.use(koaBody(config.uploadConf));//koa-body

app.use(Static(path.join(__dirname, '/public')));//静态资源中间件

app.use(responseMiddleware());//封装返回格式中间件

app.use(crossMiddleware(config.crossConf));//跨域配置中间件

app.use(authMiddleware);//验证登录中间件

app.use(router.routes());//路由中间件

//监听错误
app.on('error', (err, ctx) => {
    console.error('小问题没得事:', err);
    logger.error(err);
    /* if (global.err) {
        global.err.desc = err;//记录程序错误日志
    } */
    // ctx.throw(err);
})

const server = http.createServer(app.callback());
const io = require('socket.io')(server);
//使用命名空间进行软隔离
const chat = io.of('chat').on('connection', socket => {
    let ioCtrl = new chatControler(chat);//chatControler是一个简易聊天室的类
    ioCtrl.init(socket);
});
module.exports = server;