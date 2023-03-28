/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_award_user', {
    tg_award_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tg_award_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tg_award',
        key: 'tg_award_id'
      }
    },
    tg_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    counter: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'tg_award_user'
  });
};
