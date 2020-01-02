const { authConf } = require('../config');
module.exports = async (ctx, next) => {
    if (!authConf.enable || authConf.white.includes(ctx.url)) return await next()
    if (!ctx.session.userinfo) {
        ctx.status = 401;
    } else {
        await next()
    }
}
