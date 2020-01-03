const errService = require('../services/errLog');

class errController {
    static async add(content) {
        await errService.add(content)
    }

    static async all(ctx) {
        let { page = 1, size = 10, ...condition } = ctx.request.query;
        let content = await errService.all(condition, Number(page), Number(size));
        ctx.success(content);
    }
}

module.exports = errController;