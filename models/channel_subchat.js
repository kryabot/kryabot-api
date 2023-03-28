/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channel_subchat', {
    channel_subchat_id: {
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
    tg_chat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    tg_chat_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    join_link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    enabled_join: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    join_follower_only: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    join_sub_only: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    ban_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '60'
    },
    bot_lang: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: 'en'
    },
    last_member_refresh: {
      type: DataTypes.DATE,
      allowNull: true
    },
    refresh_status: {
      type: DataTypes.ENUM('DONE','ERR','WAIT'),
      allowNull: true,
      defaultValue: 'DONE'
    },
    auto_kick: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    notify_stream_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    auto_mass_kick: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    last_auto_kick: {
      type: DataTypes.DATE,
      allowNull: true
    },
    getter_cooldown: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '30'
    },
    reminder_cooldown: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    last_reminder: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    warn_mute_h: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '72'
    },
    warn_expires_in: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '168'
    },
    max_warns: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '5'
    },
    on_refund: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    on_stream: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    welcome_message_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    welcome_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    min_sub_months: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    show_report: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    global_events: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    force_pause: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'channel_subchat'
  });
};
