/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tw_id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      defaultValue: '0',
      unique: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    dname: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    is_admin: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    supporter: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    tg_about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    allow_soc: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    soc_vk: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    soc_inst: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    soc_ut: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
