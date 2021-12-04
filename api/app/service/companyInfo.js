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
    const order = []

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
    if (params.creator) {
      where.creator = {
        [Op.eq]: params.creator,
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
    if(params.sort){
      order.push(params.sort.split(','))
    }
    const res = await this.ctx.model.CompanyInfo.findAndCountAll({
      where,
      attributes: [ 'id', 'name', 'representative', 'contact', 'contact_info', 'comment', 'grade', 'score', 'inspect_time', 'leadtime',
        'cooporateType', 'contract', 'productType' ],
      offset,
      limit,
      order
    });
    return res || {};
  }
  async addCompanyInfo(params) {
    params.creator = this.ctx.session.id;
    return this.ctx.model.CompanyInfo.create(params);
  }
  async updateCompanyInfo(params) {
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
    if (params.creator) {
      where.creator = {
        [Op.eq]: params.creator,
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

    if (params.productType) {
      where.productType = {
        [Op.eq]: params.productType,
      };
    }

    const res = await this.ctx.model.CompanyInfo.findAll({
      where,
      attributes: [ 'id', 'name' ],
    });
    return res || [];
  }
}

module.exports = CompanyInfoService;
