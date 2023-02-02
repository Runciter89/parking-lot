var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../data-access/database');
const { VEHICLE_TYPE } = require('../shared/constants').enums

const { DataTypes } = Sequelize;
var vehicles = sequelize.define('vehicles', {
	numberPlate: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
	},
	vehicle_type: {
		type: DataTypes.ENUM(Object.keys(VEHICLE_TYPE).map(k => VEHICLE_TYPE[k])),
		defaultValue: VEHICLE_TYPE.NON_RESIDENT,
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