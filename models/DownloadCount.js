const { sequelize, Sequelize } = require('../database/mysql.js');

const DownloadCount = sequelize.define('t_download_count', {
    download_cnt: { type: Sequelize.INTEGER, allowNull: false }
})

module.exports = DownloadCount;