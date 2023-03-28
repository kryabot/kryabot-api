/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('scheduler', {
    scheduler_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    task_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exec_ts: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delay_ts: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    delay_seconds: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    fixed_hour: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'scheduler'
  });
};
