module.exports = function (options) {
    return async (ctx, next) => {
        if (!options.enable) return await next();
        if (ctx.method === 'OPTIONS') ctx.status = 200;
        ctx.set('Access-Control-Allow-Origin', options.allowOrigin.join(','));
        ctx.set('Access-Control-Allow-Methods', options.allowMethods.join(','));
        if (options.allowHeaders.length) ctx.set('Access-Control-Allow-Headers', options.allowHeaders.join(','));
        ctx.set('Access-Control-Allow-Credentials', options.allowCredentials);
        await next();
    }
}