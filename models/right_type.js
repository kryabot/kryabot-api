/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('right_type', {
    right_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    right_key: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    right_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'right_type'
  });
};
