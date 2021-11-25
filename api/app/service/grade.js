'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class GradeService extends Service {
  async findWithPager(params) {
    const where = {
      state: 0,
    };
    const limit = parseInt(params.limit || 20);
    const offset = ((params.page || 1) - 1) * limit;

    if (params.score) {
      where.score = {
        [Op.eq]: params.score,
      };
    }

    if (params.keyword) {
      where.name = {
        [Op.substring]: params.keyword,
      };
    }
    const res = await this.ctx.model.Grade.findAndCountAll({
      where,
      attributes: [ 'id', 'name', 'score', 'desc' ],
      offset,
      limit,
    });
    return res || {};
  }
  async findByName(name) {
    const res = await this.ctx.model.Grade.findOne({
      where: {
        state: 0,
        name,
      },
    });
    return res ? res.dataValues : null;
  }
  async addGrade(params) {
    return this.ctx.model.Grade.create(params);
  }
  async deleteGrade(id) {
    return await this.ctx.model.Grade.update({
      state: 1,
    }, {
      where: {
        id,
      },
    });
  }
}

module.exports = GradeService;
