'use strict';

const auth = require('./middleware/auth')();
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.v1.home.index);
  router.post('v1/login', '/api/v1/login', controller.v1.login.create);
  router.resources('v1/user', '/api/v1/user', auth, controller.v1.user);
  router.get('v1/info', '/api/v1/info', auth, controller.v1.user.info);
};
