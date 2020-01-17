const UserService = require('../services/user');

class AnthControler {
    static async login(ctx) {
        let { userName, password } = ctx.request.body;
        if (!userName || !password) {
            return ctx.fail(400, '缺少参数');
        }
        let res = await UserService.findOne({ userName }, { password: 1 });
        if (!res) {
            return ctx.fail(404, '用户不存在');
        } else if (res.password === password) {
            ctx.session.userinfo = userName;
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


module.exports = AnthControler;