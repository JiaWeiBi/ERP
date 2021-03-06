'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Grade = app.model.define('grade', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: STRING(10),
    score: INTEGER,
    desc: STRING(255),
    state: INTEGER,
  }, {
    timestamps: false,
  });

  return Grade;
};
