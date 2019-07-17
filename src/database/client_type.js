/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('client_type', {
    id: {
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
    tableName: 'client_type'
  });
};
