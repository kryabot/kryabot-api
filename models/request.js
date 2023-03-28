/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request', {
    request_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      },
      unique: true
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    request_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'request'
  });
};
