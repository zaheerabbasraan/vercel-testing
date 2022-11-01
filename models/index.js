'use strict';
import process from 'process';
import Sequelize from 'sequelize';
import {configData} from '../migrations/config/config.js';

import airport from './airport.js';
import equipment from './equipment.js';
import helment from './helment.js';
import lessontype from './lessontype.js';
import setting from './setting.js';
import skilllevel from './skilllevel.js';
import user from './user.js';
import vehicle from './vehicle.js';
import currency from './currency.js';
import lesson from './lesson.js';

const db = {};

const env = process.env.NODE_ENV || 'development';
const config = configData[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


    const vehicleModel = vehicle(sequelize,Sequelize.DataTypes);
    db[vehicleModel.name] = vehicleModel;
    const equipmentModel = equipment(sequelize,Sequelize.DataTypes);
    db[equipmentModel.name] = equipmentModel;    
    const helmentModel = helment(sequelize,Sequelize.DataTypes);
    db[helmentModel.name] = helmentModel;
    const lessonTypeModel = lessontype(sequelize,Sequelize.DataTypes);
    db[lessonTypeModel.name] = lessonTypeModel;
    const settingModel = setting(sequelize,Sequelize.DataTypes);
    db[settingModel.name] = settingModel;
    const skillLevelModel = skilllevel(sequelize,Sequelize.DataTypes);
    db[skillLevelModel.name] = skillLevelModel;
    const userModel = user(sequelize,Sequelize.DataTypes);
    db[userModel.name] = userModel;
    const airportModel = airport(sequelize,Sequelize.DataTypes);
    db[airportModel.name] = airportModel;
    const currencyModel = currency(sequelize,Sequelize.DataTypes);
    db[currencyModel.name] = currencyModel;
    const lessonModel = lesson(sequelize,Sequelize.DataTypes);
    db[lessonModel.name] =  lessonModel;

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

export default db;
