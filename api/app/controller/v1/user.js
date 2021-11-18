'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }

  async info() {
    if (this.ctx.query && this.ctx.query.token) {
      switch (parseInt(this.ctx.query.token)) {
        case 1:
          return this.ctx.success({
            roles: ['superAdmin']
          });
        case 10:
          return this.ctx.success({
            roles: ['admin']
          });
        default:
          return this.ctx.success({
            roles: ['generalUser']
          });
      }
    } else {
      return this.ctx.success({
        roles: ['generalUser']
      })
    }
  }
}

module.exports = UserController;
