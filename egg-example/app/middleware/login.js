module.exports = option=>{
    return async (ctx,next)=>{
        await next()
        if(!option.enable) return
        if(option.whiteUrl.includes(ctx.url)) return
        if(!ctx.session.user){
            ctx.logger.info('未登录');
            ctx.redirect('/login.html')
        }
    }
}