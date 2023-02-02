const controller = {}

//imports
var Vehicles = require('../models/Vehicles');
var Register = require('../models/ParkingLot');
const { VEHICLE_TYPE } = require('../shared/constants').enums
var fs = require('fs');

controller.makResidentReport = async (req, res) => {
  let data = null;
  let tax = null;

  try {
    const { fileName } = req.body;

    const response = await Vehicles.findAll({
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



    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}


module.exports = controller;
