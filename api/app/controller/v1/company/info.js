'use strict';

const Controller = require('egg').Controller;
const { RoleLevel } = require('../../../constant/roleLevel');

class CompanyInfoController extends Controller {
  async index() {
    const { ctx } = this;

    // 管理员只能查看自己录入的数据
    if (ctx.session.level === RoleLevel.Admin) {
      ctx.query.creator = ctx.session.id;
    }
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
