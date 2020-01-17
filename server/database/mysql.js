const Sequelize = require('sequelize');
const { mysqlConf } = require('../config');
const sequelize = new Sequelize(mysqlConf.database, mysqlConf.username, mysqlConf.password, {
    host: mysqlConf.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    //解决中文输入问题
    define: {
        'underscored': true,
        'charset': 'utf8mb4'
    }
});

sequelize.authenticate().then(() => {
    console.log('mysql数据库连接ok');
}).catch(err => {
    console.error('mysql数据库连接失败：', err);
});

module.exports = { sequelize, Sequelize };