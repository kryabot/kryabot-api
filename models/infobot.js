/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infobot', {
    infobot_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    target_type: {
      type: DataTypes.ENUM('TG'),
      allowNull: false
    },
    target_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    target_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    join_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    enabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    auth_key: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: 'EN'
    }
  }, {
    tableName: 'infobot'
  });
};
