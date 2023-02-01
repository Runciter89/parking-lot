var Sequelize = require('sequelize');

const database = new Sequelize('parking','root','',{
    dialect: 'mysql'
    });

    //database.authenticate().then(() =>{
      // console.log("conection successfull");
   // }).catch((err)=>{
      // console.log("Error Conecting to database");  
    //});

    database.sync()

module.exports = database;