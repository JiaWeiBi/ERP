'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Project = app.model.define('project', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: STRING(10),
    creator: BIGINT,
    desc: STRING(1024),
    state: INTEGER,
  }, {
    timestamps: false,
  });

  Project.associate = function() {
    app.model.Project.hasMany(app.model.CompanyProject, { foreignKey: 'id', targetKey: 'projectId', as: 'company' });
  };

  return Project;
};
