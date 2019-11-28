module.exports = option => {
    return async (ctx, next) => {
        await next()
        if (!option.enable) return
        if (option.whiteUrl.includes(ctx.url)) return
        if (!ctx.session.user) {
            ctx.logger.info('未登录');
            ctx.status = 200;
            ctx.body = {
                code: 401,
                data: '未登录'
            }
        }
    }
}