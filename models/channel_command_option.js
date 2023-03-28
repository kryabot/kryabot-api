/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channel_command_option', {
    channel_command_option_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_command_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'channel_command',
        key: 'channel_command_id'
      }
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ratio: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'channel_command_option'
  });
};
