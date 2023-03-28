/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('twitch_subdata', {
    twitch_subdata_id: {
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
    event_id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    event_type: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    event_ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_gift: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    tier: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    record_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'twitch_subdata'
  });
};
