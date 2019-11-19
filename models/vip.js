const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    age: Number
})

const model = mongoose.model('vips', schema)

async function initData() {
    await model.deleteMany();
    await model.insertMany([
        {
            name: '二货',
            age: 17
        },
        {
            name: '高手',
            age: 12
        },
        {
            name: 'dishou',
            age: 16
        },
        {
            name: '帅哥',
            age: 13
        }
    ])
}
initData()

module.exports = model