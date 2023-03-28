/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channel', {
    channel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      },
      unique: true
    },
    channel_name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true
    },
    auto_join: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    allow_web_access: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    trigger_period: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '30'
    },
    default_notification: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: '#user# PogChamp <3'
    },
    scan_messages: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    on_spam_detect: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    priority: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'channel'
  });
};
