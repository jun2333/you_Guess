const mongoose = require('mongoose')
const assert = require('assert')

mongoose.connect('mongodb://localhost:27017/test', { keepAlive: 120 })

const con = mongoose.connection;
con.on('error', () => {
    console.error('数据库连接失败')
})

con.on('open', async () => {
    const fluitsSchema = mongoose.Schema({
        "name": {
            type: String,
            // index: true
        },//字段级别索引
        "price": {
            type: Number,
            min: [5, '价格太低'],
            max: 10
        },
        "unit": String,
        "stock": Number
    })
    //schema级别索引
    fluitsSchema.index({ name: 1, type: -1 })
    //定义实例方法
    fluitsSchema.methods.getPrice = function () {
        return this.price
    }
    //定义静态方法
    fluitsSchema.statics.getStock = function () {
        return this.stock
    }

    //虚拟值不存入数据库
    fluitsSchema.virtual('fullPrice').get(function () {
        return this.price + (this.unit === 'rmb' ? '元' : '$');
    })

    const fluitsModel = mongoose.model('fluit', fluitsSchema)
    //索引构建完成或失败后会触发index事件
    fluitsModel.on('index', e => {
        console.log('-----', e)
    })
    try {
        /* let a = new fluitsModel({
            name: '苹果',
            price: 10,
            unit: 'rmb',
            stock: 10
        })
        console.log(a);
        console.log(a.fullPrice);
        console.log(a.getPrice());
        console.log(fluitsModel.getStock());
        console.log(a.toJSON())
        console.log(a.toObject())
        a.save() */
        /* let r = await fluitsModel.find().limit(20).sort({ price: -1 }).select({price:1,stock:1})
        console.log('查询结果:', r) */
        //验证
        /* let b = new fluitsModel({
            name: '香蕉',
            price: 4,
            unit: 'rmb',
            stock: 1
        })
        let error = b.validateSync();
        console.log(error.errors['price'].message); */
        // assert.equal(error.errors['price'].message,'价格太');
        // assert.ok(!error.errors['price'].message)
    } catch (e) {
        console.log(e)
    }
})


