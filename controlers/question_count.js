const QuestionCountService = require('../services/question_count.js');

class QuestionCountControler {
    static async findOne(ctx) {
        let questionId = Number(ctx.params.id);
        let attributes = ['view_cnt', 'useful', 'useless', 'id', 'question_id'];
        try {
            let res = await QuestionCountService.findOne({ questionId }, attributes);
            ctx.success(res);
        } catch (e) {
            console.log(e);
            ctx.fail(500, '系统错误')
        }
    }
    static async updateOne(ctx) {
        let questionId = Number(ctx.params.id);
        let type = Number(ctx.request.body.type);//1是pv,2是反馈是否有用
        let isUseful = Number(ctx.request.body.flag);//1是增,0是减
        let attributes = ['view_cnt', 'useful', 'useless', 'id', 'question_id'];
        try {
            let questionCount = await QuestionCountService.findOne({ questionId }, attributes);
            let content = {
                useful: questionCount.useful,
                useless: questionCount.useless,
                view_cnt: questionCount.view_cnt
            };
            if (type === 1) {
                content.view_cnt += 1;
            } else if (type === 2) {
                content.useful = isUseful === 1 ? (content.useful + 1) : content.useful;
                content.useless = isUseful === 0 ? (content.useless + 1) : content.useless;
            } else {
                return ctx.status = 400;
            }
            await QuestionCountService.updateOne(content, { id: questionCount.id });
            ctx.success();
        } catch (e) {
            console.log(e);
            ctx.fail(500, '系统错误');
        }
    }
}

module.exports = QuestionCountControler;