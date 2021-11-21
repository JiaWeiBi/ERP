'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const { ctx } = this;

    return ctx.success(await ctx.service.category.findWithPager({
      ...ctx.query,
    }));
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    const info = await ctx.service.category.findBy({
      name: params.name,
      type: params.type,
    });
    if (info) {
      return ctx.fail(1004, '同名分类已存在');
    }
    return ctx.success(await ctx.service.category.addCategory(params));
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    return ctx.success(await ctx.service.category.deleteCategory(id));
  }
}

module.exports = CategoryController;
