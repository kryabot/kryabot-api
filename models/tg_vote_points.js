/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_vote_points', {
    tg_vote_points_id: {
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
    tg_vote_nominee_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tg_vote_nominee',
        key: 'tg_vote_nominee_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'tg_vote_points'
  });
};
