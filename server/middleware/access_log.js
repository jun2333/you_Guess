const { accessLogger } = require('../logger.js');

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.ip;
};

//预留options配置中间件
function accessLog(options) {
    return async (ctx, next) => {
        if (!options.enable) return await next();
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        const { method, url } = ctx.request;
        const clientIp = getClientIP(ctx.request);
        const { status } = ctx.response;
        accessLogger.info(`${clientIp} ${method} ${url} ${status} ${ms}ms`);
        console.log(`${clientIp} ${method} ${url} ${status} ${ms}ms`);
        ctx.response.set('X-Response-Time', `${ms}ms`);
    }
}

module.exports = accessLog