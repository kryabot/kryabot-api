/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('twitch_chat_notice', {
    twitch_chat_notice_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'channel',
        key: 'channel_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    notice_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    tier: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    count1: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    count2: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    target_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'twitch_chat_notice'
  });
};
