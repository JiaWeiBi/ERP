'use strict';

const Controller = require('egg').Controller;

class LogoutController extends Controller {
  async create() {
    const { ctx } = this;
    ctx.session = null;
    return ctx.success();
  }
}

module.exports = LogoutController;
