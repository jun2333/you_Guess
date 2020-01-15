const CategoryService = require('../services/category.js');

class CategoryControler {
    static async create(ctx) {
        let cateKey = ctx.params.cateKey;
        let { lang, value, order, iconfocus, iconblur } = ctx.query;
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
            let res = await CategoryService.createOne(content);
            ctx.success();
        } catch (err) {
            ctx.fail(500, '系统错误');
        }
    }
    static async find(ctx) {
        let cateKey = ctx.params.cateKey;
        let { lang, page, size } = ctx.query;
        let attributes = ['id', ['language', 'lang'], ['name', 'value'], ['icon_focus', 'iconfocus'], ['icon_blur', 'iconblur'], 'order', 'descs'];
        let res = await CategoryService.find({ key: cateKey, language: lang }, attributes);
        ctx.success(res);
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
            let res = await CategoryService.updateOne(content, { id });
            ctx.success();
        } catch (err) {
            ctx.fail(500, '系统错误');
        }
    }
    static async remove(ctx) {
        let id = ctx.query.id;
        let res = await CategoryService.remove({ id });
        ctx.success(res)
    }
    static async updateOrder(ctx) {
        let { id, order } = ctx.request.body;
        let res = await CategoryService.updateOne({ order }, { id });
        ctx.success(res);
    }
}

module.exports = CategoryControler;