module.exports = ()=>{
    return async (ctx,next)=>{
        try{
            await next()
        }catch(e){
            // ctx.logger.error('捕获到错误:',e)
            throw(e)
        }
    }
}