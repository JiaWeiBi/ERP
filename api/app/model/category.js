'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Category = app.model.define('category', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: STRING(10),
    type: INTEGER,
    desc: STRING(255),
    state: INTEGER,
  }, {
    timestamps: false,
  });

  return Category;
};
