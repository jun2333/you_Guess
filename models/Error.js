const mongoose = require('../database/mongoose');

const ErrSchema = new mongoose.Schema({
    desc: String,
    date: { type: Date, default: Date.now },
});

const ErrModel = mongoose.model('errlog', ErrSchema);

module.exports = ErrModel;