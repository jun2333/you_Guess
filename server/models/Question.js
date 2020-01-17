const { sequelize, Sequelize } = require('../database/mysql.js');

const Question = sequelize.define('t_question', {
    language: { type: Sequelize.STRING(10), allowNull: false, defaultValue: '' },
    title: {type:Sequelize.STRING(100),allowNull:false},
    content:{type:Sequelize.TEXT,allowNull:false},
    status: { type: Sequelize.TINYINT(4), allowNull: true, defaultValue: null },
    pub_time: { type: Sequelize.DATE, defaultValue: null },
    order: { type: Sequelize.INTEGER, defaultValue: 1 },
    operator: { type: Sequelize.STRING(64), allowNull: true, defaultValue: '' },
    descs: { type: Sequelize.STRING(128), allowNull: true, defaultValue: '' },
})

module.exports = Question;