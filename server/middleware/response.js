function routerResponse(option = {}) {
    return async(ctx, next) => {
        ctx.success = data => {
            ctx.type = option.type || 'json';
            ctx.body = {
                status: 1,
                msg: option.msg || 'success',
                data: data || null
            }
        };
        ctx.fail = (code, msg) => {
            ctx.type = option.type || 'json';
            ctx.body = {
                status: code,
                msg: msg || 'fail',
            }
        }
        await next();
    }
}

module.exports = routerResponse;