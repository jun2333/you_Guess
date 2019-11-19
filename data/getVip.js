const vipModel = require('../models/vip')

const getVip = async(ctx,next) => {
    if(ctx.accepts('html')==='html'){
        ctx.state.vipData = await vipModel.find()
    }
    if(ctx.accepts('json')==='json'){
        ctx.state.vipData = await vipModel.find()
    }
    await next()
}

module.exports = getVip