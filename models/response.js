/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('response', {
    response_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    request_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'request',
        key: 'request_id'
      }
    },
    tg_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tg_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tg_second_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tg_tag: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    lang: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'response'
  });
};
