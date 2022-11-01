import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

class Helment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Helment.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(20,2)
  }, {
    sequelize,
    modelName: 'Helment',
  });
  return Helment;
}