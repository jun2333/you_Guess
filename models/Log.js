const mongoose = require('../database/mongoose.js');

const logSchema = new mongoose.Schema({
    userName: String,
    method: String,
    host: String,
    url: String,
    status: Number,
    res: String,
    desc: String,
    date: { type: Date, default: Date.now },
});

const logModel = mongoose.model('log', logSchema);

module.exports = logModel;