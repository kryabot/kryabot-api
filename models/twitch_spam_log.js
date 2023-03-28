/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('twitch_spam_log', {
    twitch_spam_log_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sender: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ts: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'twitch_spam_log'
  });
};
