const { sequelize, Sequelize } = require('../database/mysql.js');

const Task = sequelize.define('task', {
    title: { type: Sequelize.STRING(50), allowNull: false },
    content: { type: Sequelize.STRING(300), allowNull: false },
    status: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    startdate: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    enddate: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
})

module.exports = { Task, Sequelize };