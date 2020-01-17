const { sequelize, Sequelize } = require('../database/mysql.js');
const Category = require('./Category.js');
const Download = require('./Download.js');
const DownloadCount = require('./DownloadCount.js');
const Question = require('./Question.js');
const QuestionCount = require('./QuestionCount.js');


Download.hasOne(DownloadCount, { foreignKey: 'downloadId', as: 'DownloadCount' });
DownloadCount.belongsTo(Download, { foreignKey: 'downloadId', as: 'Download' });
Question.hasOne(QuestionCount, { foreignKey: 'questionId', as: 'QuestionCount' });
QuestionCount.belongsTo(Question, { foreignKey: 'questionId', as: 'Question' });
Category.hasMany(Download, { foreignKey: 'cateId', as: 'Download' });
Category.hasMany(Question, { foreignKey: 'cateId', as: 'Question' });


sequelize.sync()

module.exports = { Download, Category, DownloadCount, Question, QuestionCount };




