const { sequelize, Sequelize } = require('../database/mysql.js');

const QuestionCount = sequelize.define('t_question_count', {
    view_cnt: { type: Sequelize.INTEGER, allowNull: false },
    useful: { type: Sequelize.INTEGER, allowNull: false },
    useless: { type: Sequelize.INTEGER, allowNull: false },
})

module.exports = QuestionCount;