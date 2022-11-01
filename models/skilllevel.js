import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Skilllevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Skilllevel.init({
    name: DataTypes.STRING,
    type: DataTypes.ENUM('skiing','snowboarding')
  }, {
    sequelize,
    modelName: 'Skilllevel',
  });

  return Skilllevel;
}