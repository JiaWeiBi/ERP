'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class CategoryService extends Service {
  async findWithPager(params) {
    const where = {
      state: 0,
    };
    const limit = parseInt(params.limit || 20);
    const offset = ((params.page || 1) - 1) * limit;

    if (params.type) {
      where.type = {
        [Op.eq]: params.type,
      };
    }

    if (params.keyword) {
      where.name = {
        [Op.substring]: params.keyword,
      };
    }
    if (params.creator) {
      where.creator = {
        [Op.eq]: params.creator,
      };
    }
    const res = await this.ctx.model.Category.findAndCountAll({
      where,
      attributes: [ 'id', 'name', 'type', 'desc' ],
      offset,
      limit,
    });
    return res || {};
  }
  async findBy({ name, type }) {
    const res = await this.ctx.model.Category.findOne({
      where: {
        state: 0,
        name,
        type,
      },
    });
    return res ? res.dataValues : null;
  }
  async addCategory(params) {
    params.creator = this.ctx.session.id;
    return this.ctx.model.Category.create(params);
  }
  async deleteCategory(id) {
    return await this.ctx.model.Category.update({
      state: 1,
    }, {
      where: {
        id,
      },
    });
  }
  async searchAll(params) {
    const where = {
      state: 0,
    };

    if (params.type) {
      where.type = {
        [Op.eq]: params.type,
      };
    }

    if (params.keyword) {
      where.name = {
        [Op.substring]: params.keyword,
      };
    }

    if (params.creator) {
      where.creator = {
        [Op.eq]: params.creator,
      };
    }
    const res = await this.ctx.model.Category.findAll({
      where,
      attributes: [ 'id', 'name', 'type' ],
    });
    return res || [];
  }
}

module.exports = CategoryService;
