module.exports = () => {
    return async (ctx, next) => {
        try {
            await next();
            console.log(ctx.status);
        } catch (e) {
            throw (e)
        }
    }
}