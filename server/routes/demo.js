const Router = require('koa-router')
const KeyGrip = require('keygrip')
const router = new Router()

router.get('/', async ctx => {
    let title = 'hello',
        list = ctx.state.vipData;
    // ctx.set('ETag', '123');
    //给context对象添加方法
    ctx.getCookie = (name) => {
        return ctx.cookies.get(name)
    }
    ctx.app.keys = new KeyGrip(['123', 'i like turtle'], 'sha256');//设置签名的cookie密钥
    ctx.cookies.set('name', 'cjj', { signed: true });
    let user = ctx.getCookie('name.sig')
    // ctx.throw(401, 'no login', { user: 'chenjun' })//抛出错误
    // ctx.assert(user,'401','no login')
    await ctx.render('index', {
        list,
        title
    })
})

router.get('/data.json', async ctx => {
    ctx.redirect('/')
    /* ctx.status = 200;
    ctx.body = ctx.state.vipData */
})

module.exports = router