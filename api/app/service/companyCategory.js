const Service = require('egg').Service;
const { Op } = require('sequelize');

class CompanyCategoryService extends Service {
  async findWithPager(params) {
    const where = {
      state: 0,
    };
    const limit = parseInt(params.limit || 20);
    const offset = ((params.page || 1) - 1) * limit;

    if (params.categoryId) {
      where.categoryId = {
        [Op.eq]: params.categoryId,
      };
    }

    if (params.companyId) {
      where.companyId = {
        [Op.eq]: params.companyId,
      };
    }

    // if (params.type) {
    //   where['$category.type'] = params.type
    // }

    const res = await this.ctx.model.CompanyCategory.findAndCountAll({
      where,
      include: [
        {
          model: this.ctx.model.Category,
          where: params.type ? {
            type: params.type,
          } : {},
          as: 'category',
        },
        {
          model: this.ctx.model.CompanyInfo,
          as: 'companyInfo',
        },
      ],
      attributes: [ 'id' ],
      offset,
      limit,
    });
    return res || {};
  }
  async findBy({ categoryId, companyId }) {
    const res = await this.ctx.model.CompanyCategory.findOne({
      where: {
        state: 0,
        categoryId,
        companyId,
      },
    });
    return res ? res.dataValues : null;
  }
  async addCompanyCategory(params) {
    return this.ctx.model.CompanyCategory.create(params);
  }
  async deleteCompanyCategory(id) {
    return await this.ctx.model.CompanyCategory.update({
      state: 1,
    }, {
      where: {
        id,
      },
    });
  }
}

module.exports = CompanyCategoryService;
