/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('setting', {
    setting_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    setting_key: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    setting_value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('BOT','WEB'),
      allowNull: false
    }
  }, {
    tableName: 'setting'
  });
};
