'use strict';

module.exports = app => {
  const { INTEGER, BIGINT } = app.Sequelize;

  const CompanyProject = app.model.define('company_project', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    projectId: BIGINT,
    companyId: BIGINT,
    creator: BIGINT,
    state: INTEGER,
  }, {
    timestamps: false,
  });

  CompanyProject.associate = function() {
    app.model.CompanyProject.belongsTo(app.model.Project, { foreignKey: 'projectId', targetKey: 'id', as: 'project' });
    app.model.CompanyProject.belongsTo(app.model.CompanyInfo, { foreignKey: 'companyId', targetKey: 'id', as: 'companyInfo' });
  };
  return CompanyProject;
};
