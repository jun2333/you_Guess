const Controller = require('egg').Controller;

class AppController extends Controller {
    async login() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        let { dataValues } = await ctx.model.Admin.findOne({ where: { username } });
        if (dataValues.password !== password) {
            return ctx.body = {
                code:1,
                data:'用户名不存在或密码错误'
            }
        }
        ctx.session.user = username;
        ctx.body = {
            code: 0,
            data: '登录成功'
        }
    }
}

module.exports = AppController;