const mongoose = require('../database/mongoose.js');

const userSchema = new mongoose.Schema(
    {
        userName: String,
        password: String,
        nick: String,
        tel: String,
        created: {
            type: Date,
            default: Date.now()
        },
        updated: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

