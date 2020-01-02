const logModel = require('../models/Log');

class logServer {
    static async add(conetnt) {
        let log = new logModel(conetnt);
        await log.save();
    }
    static async all(condition, page, size) {
        let logs = await logModel.find(condition, '_id userName method url date host status res desc').skip((page - 1) * size).limit(size).sort({ _id: -1 });
        let count = await logModel.count(condition);
        return { logs, page: { page, size, count } }
    }
}

module.exports = logServer;