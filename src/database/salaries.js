/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('salaries', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    salary: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'salaries'
  });
};
