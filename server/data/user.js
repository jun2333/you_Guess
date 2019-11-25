const userModel = require('../models/user')

exports.register = async (ctx, next) => {
    let { nick, userName, password } = ctx.request.body;
    await userModel.create({
        nick,
        userName,
        password,
    })
    ctx.status = 200;
    ctx.body = {
        msg: 'ok',
        code: '1000'
    }
}

exports.login = async (ctx, next) => {
    let { userName, password } = ctx.request.body;
    let res = await userModel.findOne({ userName: userName }).select({ password: 1 });
    console.log(res);
    if (!res.password || password !== res.password) {
        ctx.status = 200;
        ctx.body = {
            msg: '登录失败',
            code: '1001'
        }
    } else {
        next()
    }
}
exports.getUserInfo = async (ctx, next) => {
    let { userName } = ctx.state.userInfo;
    let res = await userModel.find({ userName: userName }).select({ nick: 1, userName: 1 });
    ctx.status = 200;
    ctx.body = {
        msg: 'ok',
        data: res,
        code: '1003'
    }
}
