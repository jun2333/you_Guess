const QuestionCountService = require('../services/question_count.js');

class QuestionCountControler {
    static async findOne(ctx) {
        let questionId = Number(ctx.params.id);
        let attributes = ['view_cnt', 'useful', 'useless'];
        try {
            let res = await QuestionCountService.findOne({ questionId }, attributes);
            ctx.success(res);
        } catch (e) {
            console.log(e);
            ctx.fail(500, '系统错误')
        }
    }
}

module.exports = QuestionCountControler;