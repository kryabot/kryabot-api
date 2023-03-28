/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channel_command', {
    channel_command_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'channel',
        key: 'channel_id'
      }
    },
    command: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    action: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    check_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    level: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    cooldown: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '30'
    },
    repeat_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    reply_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    additional_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    used: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'channel_command'
  });
};
