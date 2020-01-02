const userService = require('../services/user');

class anthControler {
    static async login(ctx) {
        let { userName, password } = ctx.request.body;
        if (!userName || !password) {
            return ctx.fail(400, '缺少参数');
        }
        let res = await userService.findOne({ userName }, { password: 1 });
        if (!res) {
            return ctx.fail(404, '用户不存在');
        } else if (res.password === password) {
            ctx.session.userinfo = userName;
            if(global.log) global.log.desc = `${userName}登录`;//记录登录日志
            ctx.success();
        } else {
            ctx.fail(401, '密码错误');
        }
    }
    static logout(ctx) {
        ctx.session.userinfo = null;
        ctx.success();
    }
}


module.exports = anthControler;