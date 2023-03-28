/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_instagram', {
    history_instagram_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    profile_instagram_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'profile_instagram',
        key: 'profile_instagram_id'
      }
    },
    data_type: {
      type: DataTypes.ENUM('STORY','POST'),
      allowNull: true
    },
    media_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    object_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'history_instagram'
  });
};
