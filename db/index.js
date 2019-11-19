const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

const con = mongoose.connection

con.on('error',()=>{
    console.error('连接数据库失败')
})

con.on('open',()=>{
    console.log('连接数据库成功')
})
