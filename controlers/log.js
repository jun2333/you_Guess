const logService = require('../services/log');

class logController {
    static async add(content) {
        await logService.add(content)
    }

    static async all(ctx) {
        let { page = 1, size = 10, ...condition } = ctx.request.query;
        let content = await logService.all(condition, Number(page), Number(size));
        ctx.success(content);
    }
}

module.exports = logController;