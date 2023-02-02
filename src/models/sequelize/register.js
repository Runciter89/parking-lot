const { DataTypes, literal } = require('sequelize');
// importing connection database
const db = require('../../database/sequelize');
const { VEHICLE_TYPE } = require('../../shared/constants').enums

const register = db.define('register', {
	numberPlate: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	vehicle_type: {
		type: DataTypes.ENUM(Object.keys(VEHICLE_TYPE).map(k => VEHICLE_TYPE[k])),
		defaultValue: VEHICLE_TYPE.NON_RESIDENT,
		allowNull: false
	},
	entered_at: {
		type: 'TIMESTAMP',
		defaultValue: literal('CURRENT_TIMESTAMP'),
	},
	exited_at: {
		type: 'TIMESTAMP',
		defaultValue: literal('CURRENT_TIMESTAMP'),
		allowNull: true
	},
	pay: {
		type: DataTypes.FLOAT,
		defaultValue: 0

	}
},
	{
		timestamps: false

	});

module.exports = register;