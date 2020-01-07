const TaskService = require('../services/task.js');

class TaskControler {
    static init() {
        TaskService.init(false);
    }
    static async findAll(ctx) {
        let res = await TaskService.findAll();
        ctx.success(res);
    }
    static async findOne(ctx) {
        let id = Number(ctx.params.id);
        let res = await TaskService.findOne({ id }, ['id', 'title', 'content', 'startdate', 'enddate']);
        ctx.success(res);
    }
    static async createOne(ctx) {
        let { title, content, status, startdate, enddate } = ctx.request.body;
        if (!title && !content && !status && !startdate && !enddate) return ctx.status = 400;
        await TaskService.createOne({ title, content, status, startdate, enddate });
        ctx.success();
    }
    static async removeOne(ctx) {
        let id = Number(ctx.params.id);
        await TaskService.removeOne({ id });
        ctx.success();
    }
    static async updateOne(ctx) {
        let id = Number(ctx.params.id);
        let { title, content, status, startdate, enddate } = ctx.request.body;
        if (!title && !content && !status && !startdate && !enddate) return ctx.status = 400;
        let res = await TaskService.updateOne({ id }, { title, content, status, startdate, enddate });
        if(res[0]!==1) return ctx.status = 404;
        ctx.success();
    }
};

TaskControler.init();

module.exports = TaskControler;