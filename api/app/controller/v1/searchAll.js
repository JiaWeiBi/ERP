'use strict';

const Controller = require('egg').Controller;

class SearchAllController extends Controller {
  async category() {
    const { ctx } = this;
    const params = { ...ctx.query };
    return ctx.success(await ctx.service.category.searchAll(params));
  }

  async company() {
    const { ctx } = this;
    const params = { ...ctx.query };
    return ctx.success(await ctx.service.companyInfo.searchAll(params));
  }
}

module.exports = SearchAllController;
