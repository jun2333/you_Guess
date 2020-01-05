const UserService = require('../services/user');
const { expireAsync, setAsync, getAsync } = require('../database/redis');

class UserControler {
    static async findAll(ctx) {
        let res;
        let count;
        res = JSON.parse(await getAsync('userList'));//从redis取缓存数据
        if (!res) {
            res = await UserService.all();//查询mongoDB
            count = await UserService.count();
            res = {
                count,
                res
            }
            await setAsync('userList', JSON.stringify(res));//缓存至redis
            await expireAsync('userList', 10);//设置缓存时间
        }
        ctx.success(res);
    }
    static async findOne(ctx) {
        let userName = ctx.params.name;
        let res;
        res = JSON.parse(await getAsync(userName));//从redis取缓存数据
        if (!res) {
            res = await UserService.findOne({ userName });//查询mongoDB
            await setAsync(userName, JSON.stringify(res));//缓存至redis
            await expireAsync(userName, 10);//设置缓存时间
        }
        ctx.success(res);
    }
    static async createOne(ctx) {
        let { userName, nick, password } = ctx.request.body;
        let res = await UserService.createOne({ userName, nick, password });
        console.log(res);
        ctx.success();
    }
    static async updateOne(ctx) {
        let { userName, password, nick } = ctx.request.body;
        let res = await UserService.updateOne({ userName }, { nick, password });
        console.log(res);
        ctx.success();
    }
    static async removeOne(ctx) {
        let userName = ctx.params.name;
        let res = await UserService.removeOne({ userName });
        console.log(res);
        ctx.success();
    }
    static async create(ctx) {
        let { list } = ctx.request.body;
        let res = await UserService.create(list);
        console.log(res);
        ctx.success();
    }
    static async remove(ctx) {
        let res = await UserService.remove();
        console.log(res);
        ctx.success();
    }
}

module.exports = UserControler;
