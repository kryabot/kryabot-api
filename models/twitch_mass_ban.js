/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('twitch_mass_ban', {
    twitch_mass_ban_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'channel',
        key: 'channel_id'
      }
    },
    by_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    ban_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ban_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    banned_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'twitch_mass_ban'
  });
};
