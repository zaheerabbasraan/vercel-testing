import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {
  
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Lesson.init({
    name: DataTypes.STRING,
    lesson_type: DataTypes.STRING,
    hours: DataTypes.STRING,
    number_of_people: DataTypes.INTEGER,
    days: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("days"));
      },
      set: function(value) {
        return this.setDataValue("days", JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};