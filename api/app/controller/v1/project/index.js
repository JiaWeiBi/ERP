'use strict';

const Controller = require('egg').Controller;
const { RoleLevel } = require('../../../constant/roleLevel')

class ProjectController extends Controller {
  async index() {
    const { ctx } = this;
    if( ctx.session.level === RoleLevel.Admin) {
      ctx.query.creator = ctx.session.id
    }
    return ctx.success(await ctx.service.project.findWithPager({
      ...ctx.query,
    }));
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    const info = await ctx.service.project.findByName(params.name);
    if (info) {
      return ctx.fail(1004, '同名项目已存在');
    }
    return ctx.success(await ctx.service.project.addProject(params));
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;

    if(!params.id){
      return ctx.fail(1004, '该项目不存在');
    }
    return ctx.success(await ctx.service.project.updateProject(params));
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    return ctx.success(await ctx.service.project.deleteProject(id));
  }
}

module.exports = ProjectController;
