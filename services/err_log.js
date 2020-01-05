const errModel = require('../models/Error.js');

class ErrService {
    static async add(content) {
        let err = new errModel(content);
        err.save()
    }
    static async all(condition, page, size) {
        let errs = errModel.find(condition, '_id desc date').skip((page - 1) * size).limit(size).sort({ _id: -1 });
        let count = errModel.count(condition);
        return { errs, page: { page, size, count } }
    }
}

module.exports = ErrService;