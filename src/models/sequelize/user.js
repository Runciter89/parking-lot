const { DataTypes } = require('sequelize');
// importing connection database
const db = require('../../database/sequelize');

const users = db.define('users', {
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