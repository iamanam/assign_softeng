/*: jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('staffs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contactNo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    JobTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'staffs'
  });
};
