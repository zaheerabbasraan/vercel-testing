import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Setting.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete:'CASCADE'
      });
    }
  }
  Setting.init({
    currency: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("currency"));
      },
      set: function(value) {
        return this.setDataValue("currency", JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'Setting',
  });
  return Setting;
}