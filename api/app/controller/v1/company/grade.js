'use strict';

const Controller = require('egg').Controller;

class GradeController extends Controller {
  async index() {
    const { ctx } = this;

    return ctx.success(await ctx.service.grade.findWithPager({
      ...ctx.query,
    }));
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    const info = await ctx.service.grade.findByName(params.name);
    if (info) {
      return ctx.fail(1004, '同名评级已存在');
    }
    return ctx.success(await ctx.service.grade.addGrade(params));
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    return ctx.success(await ctx.service.grade.deleteGrade(id));
  }
}

module.exports = GradeController;
