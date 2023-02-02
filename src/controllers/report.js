const controller = {}

//imports
var { Vehicle } = require('../models').sequelizeModels;
const { VEHICLE_TYPE } = require('../shared/constants').enums
var fs = require('fs');

var writeLine = (writeStream, line) => writeStream.write(`\n${line}`);
var addReportHeader = (writeStream) => {
  const header = 'Núm. placa, Tiempo estacionado (min.), Cantidad a pagar'
  writeStream.write(header)
}
controller.makResidentReport = async (param) => {
  let data = null;
  let tax = null;

  try {
    const { fileName } = param;

    if (!fileName) {
      throw new Error('filename is required')
    }

    const response = await Vehicle.findAll({
      where: { vehicle_type: VEHICLE_TYPE.RESIDENT }
    })

    const reportPath = `${process.env.FOLDER_REPORTS}/resident/${fileName}.csv`
    var report = fs.createWriteStream(reportPath, {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })


    if (fs.existsSync(reportPath)) {
      //file exists
      throw new Error('A report already exists with requested fileName. Please provide another name')
    }
    addReportHeader(report)

    response.forEach(vehicle => {
      tax = vehicle.monthly * 0.05;
      data = [vehicle.numberPlate, vehicle.monthly, tax]

      writeLine(report, data.toString())
    })

    report.end()

    return response
  } catch (e) {
    console.log(e);
    throw e
  }
}


module.exports = controller;
