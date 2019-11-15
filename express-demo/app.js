const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParse.json())

app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost:27017/test', { keepAlive: 120 })

mongoose.connection.on('error', (e) => {
    console.log('连接失败')
})

mongoose.connection.on('open', () => {
    console.log('连接成功')
})
let fluitsSchema = mongoose.Schema({
    name: {
        type: String,
    },//字段级别索引
    price: {
        type: Number,
        min: [5, '价格太低'],
        max: 100
    },
    unit: String,
    stock: Number
})
let fluitsModel = mongoose.model('fluits', fluitsSchema)


app.get("/", (req, res) => {
    res.sendFile(path.resolve("./index.html"));
});



app.post('/getData', async (req, res) => {
    let result = [];
    try {
        let data = await fluitsModel.find().limit(50).sort({ price: -1 }).select({ name: 1, price: 1, stock: 1, unit: 1 })
        result = JSON.parse(JSON.stringify(data)).map(v => {
            v.price = v.price + (v.unit === 'rmb' ? '元' : '$');
            return v
        });
        console.log(result);
    } catch (e) {
        console.error(e)
    }
    res.json({
        data: result
    })
})

app.post('/setData', async (req, res) => {
    let data = req.body;
    console.log(typeof data, data);
    try {
        let r = await fluitsModel.create(data);
        console.log(r);
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }
    res.json({
        data: 'ok'
    })
})

app.post('/modData', async (req, res) => {
    let { id, name, price, stock, unit } = req.body;
    try {
        let r = await fluitsModel.update({ _id: id }, { $set: { name, price, stock, unit } })
        console.log(r);
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }
    res.json({
        data: 'ok'
    })
})

app.post('/delData', async (req, res) => {
    let { id } = req.body;
    console.log(id, typeof id);
    try {
        let r = await fluitsModel.deleteOne({ _id: id })
        console.log(r);
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }
    res.json({
        data: 'ok'
    })
})

Promise.resolve(app.listen(3000)).then(() => {
    console.log('server listening in 3000')
})