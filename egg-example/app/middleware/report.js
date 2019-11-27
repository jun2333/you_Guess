module.exports = () => {
    return async (ctx, next) => {
        const startTime = Date.now();
        await next();
        //上报请求时间
        ctx.logger.info(`${Date.now() - startTime}ms`)
    }
}