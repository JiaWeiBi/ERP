'use strict';

const auth = require('./middleware/auth')();
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.v1.home.index);
  router.post('v1/login', '/api/v1/login', controller.v1.login.create);
  router.post('v1/logout', '/api/v1/logout', auth, controller.v1.logout.create);
  router.get('v1/info', '/api/v1/info', auth, controller.v1.user.info);

  router.resources('v1/user', '/api/v1/user', auth, controller.v1.user);
  router.resources('v1/company/info', '/api/v1/company/info', auth, controller.v1.company.info);

  // 分类通用
  router.resources('v1/production/category', '/api/v1/production/category', auth, controller.v1.production.category);
  router.resources('v1/production/company', '/api/v1/production/company', auth, controller.v1.production.company);

  // 模糊查询所有
  router.get('v1/searchAll/category', '/api/v1/searchAll/category', auth, controller.v1.searchAll.category);
  router.get('v1/searchAll/company', '/api/v1/searchAll/company', auth, controller.v1.searchAll.company);
};
