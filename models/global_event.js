/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('global_event', {
    global_event_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_key: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    active_from: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    active_to: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    label: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    cd: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '10'
    }
  }, {
    tableName: 'global_event'
  });
};
