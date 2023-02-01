var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../Config/database');

const { DataTypes } = Sequelize;
var users = sequelize.define('users', {
	name: {
		type: DataTypes.STRING,
		//primaryKey: true,
		allowNull: false,
	},
	
    password: {
		type: DataTypes.STRING,
		//primaryKey: true,
		allowNull: false,
	},

    email: {
		type: DataTypes.STRING,
		//primaryKey: true,
		allowNull: false,
	},

   
},
	{
		timestamps: true

	});

    

module.exports = users;