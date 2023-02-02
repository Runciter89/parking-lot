var Sequelize = require('sequelize');
const { DB_PROVIDER } = require('../shared/constants').enums

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: DB_PROVIDER.POSTGRES
  }
);

//database.authenticate().then(() =>{
// console.log("conection successfull");
// }).catch((err)=>{
// console.log("Error Conecting to database");  
//});

database.sync()

module.exports = database;