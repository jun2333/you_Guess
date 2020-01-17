const { sequelize, Sequelize } = require('../database/mysql.js');

const Download = sequelize.define('t_download', {
    language: { type: Sequelize.STRING(10), allowNull: false, defaultValue: '' },
    name: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    url: { type: Sequelize.STRING(512), allowNull: false, defaultValue: '' },
    msg: { type: Sequelize.TEXT, allowNull: false, defaultValue: '' },
    file_size: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    status: { type: Sequelize.TINYINT(4), allowNull: true, defaultValue: null },
    pub_time: { type: Sequelize.DATE, defaultValue: null },
    order: { type: Sequelize.INTEGER, defaultValue: 1 },
    operator: { type: Sequelize.STRING(64), allowNull: true, defaultValue: '' },
    descs: { type: Sequelize.STRING(128), allowNull: true, defaultValue: '' },
})

module.exports = Download;