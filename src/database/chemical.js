/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('chemical', {
    chemicalName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buyDate: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expoerDate: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amountExist: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'chemical'
  });
};
