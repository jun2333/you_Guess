const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  //批量查询
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.User.findAll(query);
  }
  //根据id精确搜索
  async show() {
    const ctx = this.ctx;
    let res = [];
    res.push(await ctx.model.User.findByPk(toInt(ctx.params.id)));
    ctx.body = res;
  }
  //新建数据
  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const [created_at, updated_at] = [Date.now(), Date.now()];
    const user = await ctx.model.User.create({ name, age, created_at, updated_at });
    ctx.status = 201;
    ctx.body = user;
  }
  //根据id修改数据
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    const updated_at = Date.now();
    await user.update({ name, age, updated_at });
    ctx.body = user;
  }
  //根据id删除数据
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;