const controller = {}

//imports
var { Vehicle } = require('../models').sequelizeModels;
const { VEHICLE_TYPE } = require('../shared/constants').enums
var fs = require('fs');

controller.makResidentReport = async (param) => {
  let data = null;
  let tax = null;

  try {
    const { fileName } = param;

    const response = await Vehicle.findAll({
      where: { vehicle_type: VEHICLE_TYPE.RESIDENT }
    })

    response.forEach(vehicle => {
      tax = vehicle.monthly * 0.05;
      data = [vehicle.numberPlate, vehicle.monthly, tax]

      fs.appendFile(`src/Files/${fileName}`, data.toString(), (err) => {
        if (err) {
          throw err;
        }
        console.log("file updated")
      });
    })

    return response
  } catch (e) {
    console.log(e);
    throw e
  }
}


module.exports = controller;
