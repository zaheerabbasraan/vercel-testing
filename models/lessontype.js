import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Lessontype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lessontype.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lessontype',
  });
  return Lessontype;
}