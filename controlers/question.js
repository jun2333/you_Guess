const QuestionService = require('../services/question.js');

class QuestionControler {
    static async create(ctx) {
        let { lang, type, order, content, title } = ctx.request.body;
        if (!lang || !type || !order || !content || !title) return ctx.status = 400;
        let contents = {
            language: lang,
            content,
            cateId: Number(type),
            title,
            order: Number(order),
        };
        try {
            let res = await QuestionService.createOne(contents);
            ctx.success();
        } catch (err) {
            console.log(err);
            ctx.fail(500, '系统错误');
        }
    }
    static async find(ctx) {
        let { id, page, limit } = ctx.query;
        let attributes = ['*'];
        try {
            let res = await QuestionService.find({ cateId: id }, attributes, Number(page), Number(limit));
            ctx.success(res);
        } catch (e) {
            console.log(e);
            ctx.fail(500, '系统错误');
        }

    }
    static async update(ctx) {
        let cateKey = ctx.params.cateKey;
        let { id, lang, value, order, iconfocus, iconblur } = ctx.query;
        if (!cateKey || !lang || !value || !order || !iconfocus || !iconblur) return ctx.status = 400;
        let content = {
            key: cateKey,
            language: lang,
            name: value,
            icon_focus: iconfocus,
            icon_blur: iconblur,
            order,
        };
        try {
            let res = await QuestionService.updateOne(content, { id });
            ctx.success();
        } catch (err) {
            ctx.fail(500, '系统错误');
        }
    }
    static async remove(ctx) {
        let id = ctx.query.id;
        let res = await QuestionService.remove({ id });
        ctx.success(res)
    }
    static async updateOrder(ctx) {
        let { id, order } = ctx.request.body;
        let res = await QuestionService.updateOne({ order }, { id });
        ctx.success(res);
    }
}

module.exports = QuestionControler;