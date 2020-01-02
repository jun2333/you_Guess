const userService = require('../services/user');
const { expireAsync, setAsync, getAsync } = require('../database/redis');

class userControler {
    static async findAll(ctx) {
        let res;
        let count;
        res = JSON.parse(await getAsync('userList'));//从redis取缓存数据
        if (!res) {
            res = await userService.all();//查询mongoDB
            count = await userService.count();
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
            res = await userService.findOne({ userName });//查询mongoDB
            await setAsync(userName, JSON.stringify(res));//缓存至redis
            await expireAsync(userName, 10);//设置缓存时间
        }
        ctx.success(res);
    }
    static async createOne(ctx) {
        let { userName, nick, password } = ctx.request.body;
        let res = await userService.createOne({ userName, nick, password });
        console.log(res);
        ctx.success();
    }
    static async updateOne(ctx) {
        let { userName, password, nick } = ctx.request.body;
        let res = await userService.updateOne({ userName }, { nick, password });
        console.log(res);
        ctx.success();
    }
    static async removeOne(ctx) {
        let userName = ctx.params.name;
        let res = await userService.removeOne({ userName });
        console.log(res);
        ctx.success();
    }
    static async create(ctx) {
        let { list } = ctx.request.body;
        let res = await userService.create(list);
        console.log(res);
        ctx.success();
    }
    static async remove(ctx) {
        let res = await userService.remove();
        console.log(res);
        ctx.success();
    }
}

module.exports = userControler;
