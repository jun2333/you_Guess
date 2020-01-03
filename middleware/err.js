const errController = require('../controlers/err');
const { errConf } = require('../config');

module.exports = async (ctx, next) => {
    if (!errConf.enable) return await next();
    global.err = {
        desc: null
    };
    await next();
    if (global.err.desc) {
        errController.add(global.err);
        global.err = null;
        ctx.status = 500;
    }
}