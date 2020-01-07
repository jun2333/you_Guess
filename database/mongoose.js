const mongoose = require('mongoose');
const { mongoConf } = require('../config');
mongoose.connect(`mongodb://${mongoConf.username}:${mongoConf.password}@${mongoConf.host}:${mongoConf.port}/${mongoConf.database}`);
const con = mongoose.connection;

con.on('open',()=>{
    console.log('mongoDB数据库连接ok')
});

con.on('error',err=>{
    console.log(`mongoDB数据库连接失败，错误：${err}`)
})

module.exports = mongoose;