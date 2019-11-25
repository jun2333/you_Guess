const Router = require('koa-router')
const router = new Router()
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const { register, login, getUserInfo } = require('../data/user')
const secret = require('../secret')

const key = 'userInfo'

router.post('/user/register', register)

router.post('/user/login', login, async ctx => {
    let { userName } = ctx.request.body;
    ctx.body = {
        msg: '登陆成功',
        data: {
            token: jwt.sign({
                data: userName,
                exp: Math.floor(Date.now() / 1000) + 60,//设置过期时间为60s
            }, secret)
        },
        code: '1002'
    }
})
router.get('/user/userInfo', jwtKoa({ secret, key }), getUserInfo)

module.exports = router