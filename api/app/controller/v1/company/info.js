'use strict';

const Controller = require('egg').Controller;

class CompanyInfoController extends Controller {
  async index() {
    const { ctx } = this;

    return ctx.success(await ctx.service.companyInfo.findWithPager({
      ...ctx.query,
    }));
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    // @todo 检查权限
    return ctx.success(await ctx.service.companyInfo.addCompanyInfo(params));
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;

    if (!params.id) {
      ctx.fail(1005, '参数错误');
    }
    // @todo 检查权限

    return ctx.success(await ctx.service.companyInfo.updateCompanyInfo(params));
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    return ctx.success(await ctx.service.companyInfo.deleteCompanyInfo(id));
  }
}

module.exports = CompanyInfoController;
