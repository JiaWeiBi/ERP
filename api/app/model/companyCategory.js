'use strict';

module.exports = app => {
  const { INTEGER, BIGINT } = app.Sequelize;

  const CompanyCategory = app.model.define('company_category', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    categoryId: BIGINT,
    companyId: BIGINT,
    state: INTEGER,
  }, {
    timestamps: false,
  });

  CompanyCategory.associate = function() {
    app.model.CompanyCategory.belongsTo(app.model.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'category' });
    app.model.CompanyCategory.belongsTo(app.model.CompanyInfo, { foreignKey: 'companyId', targetKey: 'id', as: 'companyInfo' });
  };
  return CompanyCategory;
};
