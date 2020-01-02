const mongoose = require('mongoose');
const { db } = require('../config');
mongoose.connect(`mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`);
const con = mongoose.connection;

con.on('open',()=>{
    console.log('数据库连接ok')
});

con.on('error',err=>{
    console.log(`数据库连接失败，错误：${err}`)
})

module.exports = mongoose;