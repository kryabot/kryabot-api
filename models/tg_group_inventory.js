/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tg_group_inventory', {
    tg_group_inventory_id: {
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
    currency_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'currency_type',
        key: 'currency_type_id'
      }
    },
    amt: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tg_group_inventory'
  });
};
