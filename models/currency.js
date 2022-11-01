import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Currency.init({
    code: DataTypes.TEXT,
    symbol: DataTypes.TEXT,
    exchange_rate: DataTypes.DECIMAL(20,2),
    auto: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Currency',
  });
  return Currency;
};