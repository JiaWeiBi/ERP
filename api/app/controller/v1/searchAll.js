'use strict';

const Controller = require('egg').Controller;
const { RoleLevel } = require('../../constant/roleLevel');

class SearchAllController extends Controller {
  async category() {
    const { ctx } = this;
    if (ctx.session.level === RoleLevel.Admin) {
      ctx.query.creator = ctx.session.id;
    }
    const params = { ...ctx.query };
    return ctx.success(await ctx.service.category.searchAll(params));
  }

  async company() {
    const { ctx } = this;

    if (ctx.session.level === RoleLevel.Admin) {
      ctx.query.creator = ctx.session.id;
    }

    const params = { ...ctx.query };

    return ctx.success(await ctx.service.companyInfo.searchAll(params));
  }
}

module.exports = SearchAllController;
