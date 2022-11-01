import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehicle.init({
    name: DataTypes.STRING,
    min_passengers: DataTypes.NUMBER,
    max_passengers: DataTypes.NUMBER,
    min_childs: DataTypes.NUMBER,
    max_childs: DataTypes.NUMBER,
    price: DataTypes.DECIMAL(20,2),
  }, {
    sequelize,
    modelName: 'Vehicle',
  });

return Vehicle;
}