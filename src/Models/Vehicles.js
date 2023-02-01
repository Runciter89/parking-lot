var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../Config/database');

const { DataTypes } = Sequelize;
var vehicles = sequelize.define('vehicles', {
	numberPlate: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
	},
	vehicle_type: {
		type: DataTypes.ENUM([
			'RESIDENT',
			'NON_RESIDENT',
			'OFFICIAL'
		]),
		defaultValue: 'NON_RESIDENT',
		allowNull: false
	},

	monthly: {
		type: DataTypes.FLOAT,
		defaultValue: 0

	}
},
	{
		timestamps: false

	});

module.exports = vehicles;