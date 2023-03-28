/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('web_log', {
    web_log_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    target_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    method: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    uri: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    result_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'web_log'
  });
};
