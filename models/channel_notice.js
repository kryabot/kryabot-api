/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channel_notice', {
    channel_notice_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'channel',
        key: 'channel_id'
      }
    },
    notice_type_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'notice_type',
        key: 'notice_type_id'
      }
    },
    count_from: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    count_to: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'channel_notice'
  });
};
