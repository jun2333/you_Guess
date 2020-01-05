const ErrService = require('../services/err_log');

class ErrController {
    static async add(content) {
        await ErrService.add(content)
    }

    static async all(ctx) {
        let { page = 1, size = 10, ...condition } = ctx.request.query;
        let content = await ErrService.all(condition, Number(page), Number(size));
        ctx.success(content);
    }
}

module.exports = ErrController;