/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('profile_instagram', {
    profile_instagram_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    instagram_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instagram_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    stories: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    posts: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'profile_instagram'
  });
};
