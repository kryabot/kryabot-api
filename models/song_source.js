/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('song_source', {
    song_source_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'channel',
        key: 'channel_id'
      }
    },
    source: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    key: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    tableName: 'song_source'
  });
};
