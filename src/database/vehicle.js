/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('vehicle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    companyName: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contractorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vehicleState: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'vehicle'
  });
};
