/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contractor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    adress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mobileNo: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'contractor'
  });
};
