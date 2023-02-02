const vehicle = {}
//imports
const { Vehicle } = require('../models').sequelizeModels;
const { VEHICLE_TYPE } = require('../shared/constants').enums
const debug = require('debug')('api:controller:vehicle')

async function createVehicle(data) {
  debug('createVehicle', data)
  const { number_plate, vehicle_type } = data;
  return Vehicle.create({
    numberPlate: number_plate,
    vehicle_type,
  })
}

vehicle.createOfficial = async (data) => {
  try {
    debug('createOfficial', data)
    const result = await createVehicle({
      ...data,
      vehicle_type: VEHICLE_TYPE.OFFICIAL,
    })
    return result

  } catch (e) {
    throw e
  }
}

//create resident
vehicle.createResident = async (data) => {

  try {
    const result = await createVehicle({
      ...data,
      vehicle_type: VEHICLE_TYPE.RESIDENT,
    })
    return result
  } catch (e) {
    throw e
  }
}

//vehicle list
vehicle.list = async () => {
  try {
    const result = await Vehicle.findAll()
    return result
  } catch (e) {
    throw e
  }
}

//get vehicle by numberPlate
vehicle.get = async (number_plate) => {
  try {
    const result = await Vehicle.findOne({
      where: { numberPlate: number_plate }

    })
    return result
  } catch (e) {
    throw e
  }
}

//delete vehicle
vehicle.delete = async (number_plate) => {
  try {
    const result = await Vehicle.destroy({
      where: { numberPlate: number_plate }
    })
    return result
  } catch (e) {
    throw e
  }
}
//update vehicle
vehicle.update = async (number_plate, data) => {

  try {
    const { vehicle_type } = data;

    const result = await Vehicle.update({
      vehicle_type: vehicle_type,
    }, {
      where: { numberPlate: number_plate }
    })
    return result
  } catch (e) {
    throw e
  }
}

module.exports = vehicle;