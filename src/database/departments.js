/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('departments', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dep_name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'departments'
  });
};
