'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class CompanyInfoService extends Service {
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
    if (params.grade) {
      where.grade = {
        [Op.eq]: params.grade,
      };
    }
    if (params.creater) {
      where.creater = {
        [Op.eq]: params.creater,
      };
    }

    if (params.keyword) {
      where[Op.or] = [
        {
          name: {
            [Op.substring]: params.keyword,
          },
        },
        {
          representative: {
            [Op.substring]: params.keyword,
          },
        },
        {
          contact: {
            [Op.substring]: params.keyword,
          },
        },
      ];
    }
    const res = await this.ctx.model.CompanyInfo.findAndCountAll({
      where,
      attributes: [ 'id', 'name', 'representative', 'contact', 'contact_info', 'comment', 'grade', 'score', 'inspect_time', 'leadtime' ],
      offset,
      limit,
    });
    return res || {};
  }
  async addCompanyInfo(params) {
    params.creater = this.ctx.session.id;
    return this.ctx.model.CompanyInfo.create(params);
  }
  async updateCompanyInfo(params) {
    console.log(params);
    return this.ctx.model.CompanyInfo.update(params, {
      where: {
        id: params.id,
      },
    });
  }

  async deleteCompanyInfo(id) {
    return await this.ctx.model.CompanyInfo.update({
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

    if (params.score) {
      where.score = {
        [Op.eq]: params.score,
      };
    }
    if (params.grade) {
      where.grade = {
        [Op.eq]: params.grade,
      };
    }
    if (params.creater) {
      where.creater = {
        [Op.eq]: params.creater,
      };
    }
    if (params.keyword) {
      where[Op.or] = [
        {
          name: {
            [Op.substring]: params.keyword,
          },
        },
        {
          representative: {
            [Op.substring]: params.keyword,
          },
        },
        {
          contact: {
            [Op.substring]: params.keyword,
          },
        },
      ];
    }
    const res = await this.ctx.model.CompanyInfo.findAll({
      where,
      attributes: [ 'id', 'name' ],
    });
    return res || [];
  }
}

module.exports = CompanyInfoService;
