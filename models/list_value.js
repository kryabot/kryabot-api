/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('list_value', {
    list_value_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    list_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'list',
        key: 'list_id'
      }
    },
    value_str: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    value_int: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    value_dec: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'list_value'
  });
};
