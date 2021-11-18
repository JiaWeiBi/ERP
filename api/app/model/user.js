'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    acc: STRING(50),
    pwd: STRING(100),
    phone: STRING(50),
    email: STRING(50),
    level: INTEGER,
    createdAt: BIGINT,
    updatedAt: BIGINT,
    creater: BIGINT,
    state: INTEGER
  });

  return User;
};