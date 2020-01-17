const { Question, QuestionCount } = require('../models/init_db.js');

class QuestionCountService {
    static async find(condition, attributes = ['*'], page = 1, size = 10) {
        let res = await QuestionCount.findAndCountAll({
            where: condition,
            attributes,
            raw: true,
            order: ['order'],
            offset: (page - 1) * size,
            limit: size
        })
        res = JSON.parse(JSON.stringify(res));
        return res;
    }
    static async findOne(condition, attributes = ['*']) {
        let res = await QuestionCount.findOne({
            where: condition,
            attributes
        });
        return res;
    }
    static async updateOne(content, condition) {
        let res = await QuestionCount.update(content, {
            where: condition
        });
        return res;
    }
    static async remove(condition) {
        let res = await QuestionCount.destroy({
            where: condition
        });
        return res;
    }
}

module.exports = QuestionCountService;