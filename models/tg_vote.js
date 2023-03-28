/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_vote', {
    tg_vote_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'channel',
        key: 'channel_id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    open_nominations: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    sta: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'tg_vote'
  });
};
