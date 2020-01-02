const User = require('../models/User');

class userService {
    static async all(condition = {}, page = 1, size = 10) {
        return await User.find(condition, '_id nick userName password').skip((page - 1) * size).limit(size).sort({ _id: 1 });
    }
    static async count(condition = {}) {
        return await User.count(condition);
    }
    static async findOne(condition) {
        return await User.findOne(condition);
    }
    static async createOne(content) {
        return await User.create(content);
    }
    static async updateOne(condition, content) {
        return await User.findByIdAndUpdate(condition, content);
    }
    static async removeOne(condition) {
        return await User.removeOne(condition);
    }
    static async create(list) {
        return await User.insertMany(list);
    }
    static async remove(condition) {
        return await User.deleteMany(condition);
    }
}

module.exports = userService;