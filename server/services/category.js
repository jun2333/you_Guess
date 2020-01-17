const Category = require('../models/Category.js');

class CategoryService {
    static async createOne(content) {
        let res = await Category.create(content);
        return res;
    }
    static async find(condition, attributes = ['*'], page = 1, size = 10) {
        let res = await Category.findAndCountAll({
            where: condition,
            attributes,
            raw: true,
            order: ['order'],
            offset: (page - 1) * size,
            limit: size
        })
        return res;
    }
    static async updateOne(content,condition) {
        let res = await Category.update(content,{
            where:condition
        });
        return res;
    }
    static async remove(condition) {
        let res = await Category.destroy({
            where:condition
        });
        return res;
    }
}

module.exports = CategoryService;