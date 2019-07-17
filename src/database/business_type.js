/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('business_type', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'business_type'
  });
};
