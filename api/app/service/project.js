'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class ProjectService extends Service {
  async findWithPager(params) {
    const where = {
      state: 0,
    };
    const limit = parseInt(params.limit || 20);
    const offset = ((params.page || 1) - 1) * limit;

    if (params.creator) {
      where.creator = {
        [Op.eq]: params.creator,
      };
    }

    if (params.keyword) {
      where.name = {
        [Op.substring]: params.keyword,
      };
    }
    const res = await this.ctx.model.Project.findAndCountAll({
      where,
      include: [
        {
          model: this.ctx.model.CompanyProject,
          attributes: [ 'id', 'companyId' ],
          as: 'company',
        },
      ],
      attributes: [ 'id', 'name', 'desc' ],
      offset,
      limit,
    });
    return res || {};
  }
  async findByName(name) {
    const res = await this.ctx.model.Project.findOne({
      where: {
        state: 0,
        name,
      },
    });
    return res ? res.dataValues : null;
  }
  async addProject(params) {
    params.creator = this.ctx.session.id;
    const pro = await this.ctx.model.Project.create(params);
    let companyList = params.companyIds || [];
    companyList = companyList.map(c => {
      return {
        projectId: pro.id,
        companyId: c,
        creator: params.creator,
      };
    });

    return await this.ctx.model.CompanyProject.bulkCreate(companyList);
  }

  async updateProject(params) {
    await this.ctx.model.CompanyProject.destroy({ where: { projectId: params.id } });
    params.creator = this.ctx.session.id;

    let companyList = params.companyIds || [];
    companyList = companyList.map(c => {
      return {
        projectId: params.id,
        companyId: c,
        creator: params.creator,
      };
    });
    await this.ctx.model.Project.update(params, {
      where: { id: params.id },
    });
    return await this.ctx.model.CompanyProject.bulkCreate(companyList);
  }

  async deleteProject(id) {
    await this.ctx.model.CompanyProject.update({ state: 1 }, { projectId: id });
    return await this.ctx.model.Project.update({
      state: 1,
    }, {
      where: {
        id,
      },
    });
  }
}

module.exports = ProjectService;
