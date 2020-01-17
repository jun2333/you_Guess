const { Download, Category, DownloadCount } = require('../models/init_db.js');

class DownloadService {
    static async createOne(content) {
        let download = await Download.create(content); //直接create生成一条数据
        let downloadCount = await DownloadCount.build({ download_cnt: 0});
        let res = await download.setDownloadCount(downloadCount); //通过源模型设置器方法更新关系表
        return res;
    }
    static async find(condition, attributes = ['*'], page = 1, size = 10) {
        let res = await Download.findAndCountAll({
            include: [
                {
                    model: DownloadCount, as: 'DownloadCount', attributes: ['download_cnt']
                }
            ],//预查询include
            where: condition,
            attributes,
            raw: true,
            order: ['order'],
            offset: (page - 1) * size,
            limit: size
        })
        res = JSON.parse(JSON.stringify(res));
        return res;
    }
    static async findOne(condition, attributes) {
        let res = await Download.findOne({
            where: condition,
            attributes
        });
        return res;
    }
    static async updateOne(content, condition) {
        let res = await Download.update(content, {
            where: condition
        });
        return res;
    }
    static async remove(condition) {
        let res = await Download.destroy({
            where: condition
        });
        return res;
    }
}

module.exports = DownloadService;