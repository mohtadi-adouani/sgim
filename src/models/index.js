'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const config = require(__dirname + '/../../config/config');
const db = {};
//console.log(config[env]);
let sequelize = new Sequelize(config.database,
                          config.env.username,
                          config.env.password,
                          { host : config.env.host,
                            dialect : config.env.dialect
                          });


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
sequelize.sync();
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
