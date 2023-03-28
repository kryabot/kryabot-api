/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_banned_media', {
    tg_banned_media_id: {
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
    media_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    media_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ban_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'tg_banned_media'
  });
};
