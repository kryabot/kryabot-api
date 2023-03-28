/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('profile_boosty', {
    profile_boosty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'profile_boosty'
  });
};
