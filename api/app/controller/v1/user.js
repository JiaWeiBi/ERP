'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const level = ctx.session.level;

    return ctx.success(await ctx.service.user.findWithPager({
      ...ctx.query,
      maxLevel: level,
    }));
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    if (params.level && params.level <= ctx.session.level) {
      return ctx.fail(1004, '非法操作');
    }

    const info = await ctx.service.user.findByAcc(params.acc);
    if (info) {
      return ctx.fail(1004, '账号已存在');
    }
    return ctx.success(await ctx.service.user.addUser(params));
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    // @todo 检查权限
    // if(params.level < ctx.session.level){
    //   return ctx.fail(1004, '非法操作')
    // }

    return ctx.success(await ctx.service.user.deleteUser(id));
  }
  async info() {
    const session = this.ctx.session;
    let roles = null;
    if (session && session.id) {
      switch (parseInt(session.level)) {
        case 1:
          roles = [ 'superAdmin' ];
          break;
        case 10:
          roles = [ 'admin' ];
          break;
        case 100:
        default:
          roles = [ 'generalUser' ];
          break;
      }
    } else {
      roles = [ 'generalUser' ];
    }
    return this.ctx.success({
      ...session,
      roles,
    });
  }
}

module.exports = UserController;
