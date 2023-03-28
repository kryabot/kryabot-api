/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_vote_nominee', {
    tg_vote_nominee_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tg_vote_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tg_vote',
        key: 'tg_vote_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    type: {
      type: DataTypes.ENUM('NOMINATE','IGNORE'),
      allowNull: false,
      defaultValue: 'NOMINATE'
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    added_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    tableName: 'tg_vote_nominee'
  });
};
