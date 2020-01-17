const mongoose = require('../database/mongoose.js');

const logSchema = new mongoose.Schema({
    ip: String,
    method: String,
    url: String,
    status: Number,
    time: String,
    date: Date,
});

const logModel = mongoose.model('log', logSchema);

module.exports = logModel;