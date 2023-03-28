/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_boosty', {
    history_boosty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    profile_boosty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'profile_boosty',
        key: 'profile_boosty_id'
      }
    },
    publish_ts: {
      type: DataTypes.DATE,
      allowNull: true
    },
    post_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'history_boosty'
  });
};
