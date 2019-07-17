/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('staff_department', {
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'staff_department'
  });
};
