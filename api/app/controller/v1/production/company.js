'use strict';

const Controller = require('egg').Controller;

class CompanyController extends Controller {
  async index() {
    const { ctx } = this;

    return ctx.success(await ctx.service.companyCategory.findWithPager({
      ...ctx.query,
    }));
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    const info = await ctx.service.companyCategory.findBy({
      categoryId: params.categoryId,
      companyId: params.companyId,
    });
    if (info) {
      return ctx.fail(1004, '供应商已存在');
    }
    return ctx.success(await ctx.service.companyCategory.addCompanyCategory(params));
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    return ctx.success(await ctx.service.companyCategory.deleteCompanyCategory(id));
  }
}

module.exports = CompanyController;
