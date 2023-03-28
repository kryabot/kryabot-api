/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infobot_link', {
    infobot_link_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    infobot_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'infobot',
        key: 'infobot_id'
      }
    },
    link_table: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    link_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'infobot_link'
  });
};
