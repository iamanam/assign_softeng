/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('client', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    credit_card_no: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    business_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'client'
  });
};
