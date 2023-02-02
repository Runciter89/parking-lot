var Sequelize = require('sequelize');
const { DB_PROVIDER } = require('../shared/constants').enums

const database = new Sequelize('parking', 'root', '', {
  dialect: DB_PROVIDER.POSTGRES
});

//database.authenticate().then(() =>{
// console.log("conection successfull");
// }).catch((err)=>{
// console.log("Error Conecting to database");  
//});

database.sync()

module.exports = database;