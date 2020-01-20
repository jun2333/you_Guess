const { authConf } = require('../config');
module.exports = async (ctx, next) => {
    if (!authConf.enable || authConf.whitePath.includes(ctx.url) || authConf.whiteMethod.includes(ctx.method)) return await next();
    if (!ctx.session.userinfo) {
        ctx.status = 401;
    } else {
        await next()
    }
}
