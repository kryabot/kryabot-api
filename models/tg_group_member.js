/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_group_member', {
    tg_chat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    tg_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    tg_first_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tg_second_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tg_username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sub_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'tg_group_member'
  });
};
