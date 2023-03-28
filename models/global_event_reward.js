/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('global_event_reward', {
    global_event_reward_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    global_event_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'global_event',
        key: 'global_event_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    val: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'global_event_reward'
  });
};
