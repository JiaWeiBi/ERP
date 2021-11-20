'use strict';

const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');

class LoginController extends Controller {
  async create() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (!username) {
      return ctx.fail(1001, '非法用户名');
    }
    const userInfo = await ctx.service.user.findByAcc(username);

    if (!userInfo) {
      return ctx.fail(1002, '用户不存在');
    }
    const res = bcrypt.compareSync(userInfo.pwd, password);
    if (res) {
      ctx.session = { ...userInfo, pwd: null };
      delete userInfo.id;
      delete userInfo.pwd;
      userInfo.token = userInfo.level;
      return ctx.success(userInfo);
    }
    return ctx.fail(1003, '用户名或密码错误');

  }
}

module.exports = LoginController;
