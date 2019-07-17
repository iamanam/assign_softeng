/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('pest_control_job_state', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'pest_control_job_state'
  });
};
