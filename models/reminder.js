/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reminder', {
    reminder_id: {
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
    reminder_key: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    reminder_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    completed: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'reminder'
  });
};
