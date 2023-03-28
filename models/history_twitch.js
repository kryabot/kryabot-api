/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_twitch', {
    history_twitch_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    profile_twitch_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'profile_twitch',
        key: 'profile_twitch_id'
      },
      unique: true
    },
    sta: {
      type: DataTypes.ENUM('ON','OFF'),
      allowNull: true
    },
    raw_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recovery: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    create_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'history_twitch'
  });
};
