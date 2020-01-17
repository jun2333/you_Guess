const DownloadService = require('../services/download.js');

class DownloadControler {
    static async create(ctx) {
        let { lang, type, name, msg, url, pubdate, size, order } = ctx.request.body;
        if (!lang || !type || !order || !name || !msg || !pubdate || !size || !url) return ctx.status = 400;
        let contents = {
            language: lang,
            name,
            url,
            cateId: Number(type),
            file_size: size,
            order: Number(order),
            descs: msg,
            pub_time: pubdate,
            status: 0
        };
        try {
            let res = await DownloadService.createOne(contents);
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
            let res = await DownloadService.find({ cateId: id }, attributes, Number(page), Number(limit));
            ctx.success(res);
        } catch (e) {
            console.log(e);
            ctx.fail(500, '系统错误');
        }

    }
    static async findOneById(ctx) {
        let id = ctx.params.id;
        let attributes = [['language', 'lang'], ['cate_id', 'type'], 'name', 'status', 'order', 'url', ['file_size', 'size'], ['pub_time', 'pubdate'], ['descs', 'msg']];
        try {
            let res = await DownloadService.findOne({ id }, attributes);
            ctx.success(res);
        } catch (err) {
            console.log(err);
            ctx.fail(500, '系统错误');
        }
    }
    static async update(ctx) {
        let id = ctx.params.id;
        let { lang, type, name, msg, url, pubdate, size, order } = ctx.request.body;
        if (!id) return ctx.status = 400;
        let contents = {
            language: lang,
            name,
            url,
            cateId: Number(type),
            file_size: size,
            order: Number(order),
            descs: msg,
            pub_time: pubdate,
            status: 0
        };
        try {
            let res = await DownloadService.updateOne(contents, { id });
            ctx.success();
        } catch (err) {
            ctx.fail(500, '系统错误');
        }
    }
    static async modStatus(ctx) {
        let id = Number(ctx.params.id);
        let status = Number(ctx.query.status);
        let statusArr = [0, 1]
        if (!Number.isInteger(id) || !statusArr.includes(status)) return ctx.status = 400;
        try {
            let res = await DownloadService.updateOne({ status }, { id });
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
            let res = await DownloadService.updateOne({ order }, { id });
            ctx.success();
        } catch (err) {
            ctx.fail(500, '系统错误');
        }
    }
    static async remove(ctx) {
        let id = ctx.params.id;
        try {
            let res = await DownloadService.remove({ id });
            ctx.success(res);
        } catch (err) {
            console.log(err);
            ctx.fail(500, '系统错误');
        }
    }
    static async updateOrder(ctx) {
        let { id, order } = ctx.request.body;
        let res = await DownloadService.updateOne({ order }, { id });
        ctx.success(res);
    }
}

module.exports = DownloadControler;