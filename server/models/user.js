const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nick:String,
    userName:String,
    password:String,
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel