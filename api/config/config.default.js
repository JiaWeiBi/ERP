/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636551177895_9298';

  // add your middleware config here
  config.middleware = [];

  config.cors = {
    origin: 'http://127.0.0.1:9527',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://127.0.0.1:9527' ],
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'ERP',
    username: 'root',
    password: '123456',
    define: {
      freezeTableName: true,
      // underscored: true
    },
    timezone: '+08:00',
  };
  // add your user config here
  const userConfig = {
    myAppName: 'erp-egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
