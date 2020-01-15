const Task = require('../models/Task.js');

class TaskService {
    static async init(flag) {
        await Task.sync({ force: flag });
    }
    static async findOne(condition = {}, attributes = ['*']) {
        let res = await Task.findOne({
            where: condition,
            raw: true,
            attributes
        });
        return res;
    }
    static async findAll(condition = {}, attributes = ['*'], page = 1, size = 10) {
        let res = await Task.findAndCountAll({
            where: condition,
            attributes,
            raw: true,
            order: ['startdate'],
            offset: (page - 1) * size,
            limit: size
        })
        return res;
    }
    static async createOne(content) {
        let res = await Task.create(content);
        console.log(res.get({ plain: true }));
        return res;
    }
    static async removeOne(condition) {
        let res = await Task.destroy({
            where: condition
        })
        console.log(res);
        return res;
    }
    static async updateOne(condition, content) {
        let res = await Task.update(content, {
            where: condition
        })
        console.log(res);
        return res;
    }
}

module.exports = TaskService;