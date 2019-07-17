/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('pestControlJob', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobDate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobFinishDate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jobState: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'pestControlJob'
  });
};
