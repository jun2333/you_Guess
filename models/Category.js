const { sequelize, Sequelize } = require('../database/mysql.js');

const Category = sequelize.define('t_category', {
    key: { type: Sequelize.STRING(16), allowNull: false },
    language: { type: Sequelize.STRING(10), allowNull: false, defaultValue: '' },
    name: { type: Sequelize.STRING(64), allowNull: false, defaultValue: '' },
    icon_focus: { type: Sequelize.STRING(512), allowNull: false, defaultValue: '' },
    icon_blur: { type: Sequelize.STRING(512), allowNull: false, defaultValue: '' },
    order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
    operator: { type: Sequelize.STRING(64), allowNull: true, defaultValue: '' },
    descs: { type: Sequelize.STRING(128), allowNull: true, defaultValue: '' },
})

module.exports = Category;