'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class UserService extends Service {
  async findByAcc(acc) {
    const user = await this.ctx.model.User.findOne({
      where: {
        state: 0,
        acc,
      },
    });
    return user ? user.dataValues : null;
  }

  async findWithPager(params) {
    const where = {
      state: 0,
    };
    const limit = parseInt(params.limit || 20);
    const offset = ((params.page || 1) - 1) * limit;

    if (params.level) {
      where.level = {
        [Op.eq]: params.level,
      };
    }
    if (params.maxLevel) {
      where.level = where.level || {};
      where.level[Op.gt] = params.maxLevel;
    }
    if (params.keyword) {
      where.acc = {
        [Op.substring]: params.keyword,
      };
    }
    const res = await this.ctx.model.User.findAndCountAll({
      where,
      attributes: [ 'id', 'acc', 'phone', 'email', 'level', 'createdAt', 'updatedAt', 'creater' ],
      offset,
      limit,
    });
    return res || {};
  }

  async addUser(params) {
    params.creater = this.ctx.session.id;
    params.createdAt = Math.floor(Date.now() / 1000);
    params.updatedAt = params.createdAt;

    return this.ctx.model.User.create(params);
  }

  async deleteUser(id) {
    return await this.ctx.model.User.update({
      state: 1,
      updatedAt: Math.floor(Date.now() / 1000),
    }, {
      where: {
        id,
      },
    });
  }
}

module.exports = UserService;
