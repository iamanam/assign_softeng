/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('job_types', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jobType: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'job_types'
  });
};
