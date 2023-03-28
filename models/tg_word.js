/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_word', {
    tg_word_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel_subchat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'channel_subchat',
        key: 'channel_subchat_id'
      }
    },
    restrict_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    word: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'tg_word'
  });
};
