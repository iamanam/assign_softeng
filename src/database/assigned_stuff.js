/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('assigned_stuff', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stuffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'assigned_stuff'
  });
};
