'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT, DATE } = app.Sequelize;

  const CompanyInfo = app.model.define('company_info', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: STRING(100),
    representative: STRING(50),
    contact: STRING(50),
    contact_info: STRING(100),
    comment: STRING(255),
    grade: STRING(10),
    score: INTEGER,
    inspect_time: DATE,
    leadtime: INTEGER,
    state: INTEGER,
    updatedAt: DATE,
    createdAt: DATE,
    creator: INTEGER,
  }, {
    // freezeTableName: true,
    tableName: 'company_info',
  });

  return CompanyInfo;

};
