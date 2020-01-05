const LogService = require('../services/log');

class LogController {
    static async add(content) {
        await LogService.add(content)
    }

    static async all(ctx) {
        let { page = 1, size = 10, ...condition } = ctx.request.query;
        let content = await LogService.all(condition, Number(page), Number(size));
        ctx.success(content);
    }
}

module.exports = LogController;