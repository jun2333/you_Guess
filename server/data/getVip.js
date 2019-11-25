const vipModel = require('../models/vip')

const getVip = async (ctx, next) => {
    let res = await vipModel.find();
    ctx.status = 200;
    ctx.body = {
        msg: 'ok',
        data: res,
        code: '0'
    }
}

module.exports = getVip