const logController = require('../controlers/log');
const { logConf } = require('../config');

module.exports = async (ctx, next) => {
    if (!logConf.enable || logConf.whiteMethods.includes(ctx.method)) return await next();
    global.log = {
        userName: ctx.session.userinfo,
        method: ctx.method,
        host: ctx.request.header.host,
        url: ctx.url,
        status: null,
        desc: null,
        time: null,
        res: null
    };
    await next();
    if (global.log.desc) {
        global.log.status = ctx.response.status;
        global.log.res = JSON.stringify(ctx.response.body);
        logController.add(global.log);
        global.log = null;
    }
}