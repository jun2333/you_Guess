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
    static async findOneById(ctx) {
        let id = ctx.params.id;
        let attributes = [['language', 'lang'], ['cate_id', 'type'], 'title', 'order', 'content'];
        try {
            let res = await QuestionService.findOne({ id }, attributes);
            ctx.success(res);
        } catch (err) {
            console.log(err);
            ctx.fail(500, '系统错误');
        }
    }
    static async update(ctx) {
        let id = ctx.params.id;
        let { lang, content, order, title, type } = ctx.request.body;
        if (!id) return ctx.status = 400;
        let contents = {
            cateId: type,
            language: lang,
            content: content,
            title,
            order,
        };
        try {
            let res = await QuestionService.updateOne(contents, { id });
            ctx.success();
        } catch (err) {
            ctx.fail(500, '系统错误');
        }
    }
    static async modStatus(ctx) {
        let id = ctx.params.id;
        let status = Number(ctx.query.status);
        if (!id || !status) return ctx.status = 400;
        try {
            let res = await QuestionService.updateOne({ status }, { id });
            ctx.success();
        } catch (err) {
            ctx.fail(500, '系统错误');
        }
    }
    static async modsOrder(ctx) {
        let id = ctx.params.id;
        let order = Number(ctx.query.order);
        if (!id || !order) return ctx.status = 400;
        try {
            let res = await QuestionService.updateOne({ order }, { id });
            ctx.success();
        } catch (err) {
            ctx.fail(500, '系统错误');
        }
    }
    static async remove(ctx) {
        let id = ctx.params.id;
        try {
            let res = await QuestionService.remove({ id });
            ctx.success(res);
        } catch (err) {
            console.log(err);
            ctx.fail(500, '系统错误');
        }
    }
    static async updateOrder(ctx) {
        let { id, order } = ctx.request.body;
        let res = await QuestionService.updateOne({ order }, { id });
        ctx.success(res);
    }
}

module.exports = QuestionControler;