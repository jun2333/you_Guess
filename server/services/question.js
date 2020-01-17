const { Question, Category, QuestionCount } = require('../models/init_db.js');

class QuestionService {
    static async createOne(content) {
        let question = await Question.create(content); //直接create生成一条数据
        let questionCount = await QuestionCount.build({ view_cnt: 0, useful: 0, useless: 0 });
        let res = await question.setQuestionCount(questionCount); //通过源模型设置器方法更新关系表
        return res;
    }
    static async find(condition, attributes = ['*'], page = 1, size = 10) {
        let res = await Question.findAndCountAll({
            include: [
                {
                    model: QuestionCount, as: 'QuestionCount', attributes: ['view_cnt']
                }
            ],//预查询include
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
    static async findOne(condition, attributes) {
        let res = await Question.findOne({
            where: condition,
            attributes
        });
        return res;
    }
    static async updateOne(content, condition) {
        let res = await Question.update(content, {
            where: condition
        });
        return res;
    }
    static async remove(condition) {
        let res = await Question.destroy({
            where: condition
        });
        return res;
    }
}

module.exports = QuestionService;