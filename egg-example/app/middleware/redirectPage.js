module.exports = () => {
    return async (ctx, next) => {
        await next()
        if (ctx.url === '/') ctx.redirect('/index.html');
        console.log(ctx.url)
        if (ctx.url === '/login') {
            if (!ctx.session.user) return ctx.redirect('/login.html');
            ctx.redirect('/index.html')
        }
    }
}