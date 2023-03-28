/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_get', {
    tg_get_id: {
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
    keyword: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    original_msg_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    original_chat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    cache_message_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    deleted_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    broken: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tg_get'
  });
};
