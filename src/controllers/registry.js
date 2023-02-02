const controller = {}

//imports
var Vehicles = require('../models/Vehicles');
var Register = require('../models/ParkingLot');
const { VEHICLE_TYPE } = require('../shared/constants').enums
var fs = require('fs');

/**
 * esta funcion hace una cosa rara
 * @paesram {*} req 
 * @param {*} res 
 * @returns 
 */
controller.entry = async (req, res) => {
  try {
    const { number_plate } = req.body;

    console.log(req.body)

    const [vehicle, openRegistries] = await Promise.all([
      Vehicles.findOne({
        where: { numberPlate: number_plate }
      }),
      Register.findAll({
        where: {
          numberPlate: number_plate,
          exited_at: "null"
        }
      })
    ])

    if (openRegistries.length) {
      return res.json({ success: false, error: 'bad request. this plate has an open register' })
    }

    let result = null
    if (!vehicle) {
      result = await Register.create({
        numberPlate: number_plate,
        vehicle_type: VEHICLE_TYPE.NON_RESIDENT,
        exited_at: "null"
      })
    } else {
      result = await Register.create({
        numberPlate: vehicle.numberPlate,
        vehicle_type: vehicle.vehicle_type,
        exited_at: "null"
      })
    }

    res.json({ success: true, data: null });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
controller.startMonth = async (req, res) => {
  try {
    const response = await Register.findAll({})

    response.forEach(vehicle => {

      switch (vehicle.vehicle_type) {
        case VEHICLE_TYPE.RESIDENT:
          console.log(VEHICLE_TYPE.RESIDENT)
          console.log("PLACA", vehicle.numberPlate)
          Vehicles.update({ monthly: 0 }, { where: { numberPlate: vehicle.numberPlate } })
          break;
        case 'OFFICIAL':
          console.log("OFFICIAL")
          console.log("PLACA", vehicle.numberPlate)
          Register.destroy({ where: { numberPlate: vehicle.numberPlate } })
          break;
        default:

          console.log("NONRESIDENT")

          break;
      }

    });
    res.json(response);
  } catch (e) {
    console.log(e)
    res.json({ success: false, error: e });
  }
}

//registrar salida
async function resident(data) {
  try {
    const { id } = data;

    let tminutes = null
    let sum = null
    let hours = null


    const result = await Register.findOne({
      where: { id: id }
    })

    const vehicle = await Vehicles.findOne({ where: { numberPlate: result.numberPlate } })


    hours = result.exited_at.getHours() - result.entered_at.getHours()
    hours = hours * 60
    sum = result.exited_at.getMinutes() - result.entered_at.getMinutes()
    tminutes = hours + sum + vehicle.monthly

    console.log(" horas", hours)
    console.log("MINUTOS", sum)
    console.log("MINUTOS saved", vehicle.monthly)
    console.log("FINAL MINUTOS", tminutes)

    const response = await Vehicles.update({ monthly: tminutes }, { where: { numberPlate: result.numberPlate } })

    return response
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }

}

async function nonresident(data) {
  try {
    const { id } = data;

    let tminutes = null
    let sum = null
    let hours = null


    const result = await Register.findOne({
      where: { id: id }
    })

    hours = result.exited_at.getHours() - result.entered_at.getHours()
    hours = hours * 60
    sum = result.exited_at.getMinutes() - result.entered_at.getMinutes()
    tminutes = hours + sum
    tminutes = tminutes * 0.5

    console.log(" horas", hours)
    console.log("MINUTOS", sum)
    console.log("FINAL MINUTOS", tminutes)

    const response = await Register.update({ pay: tminutes }, { where: { id: id } })

    return response
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }

}


controller.exit = async (req, res) => {
  try {

    const { number_plate } = req.body;

    const result = await Register.findOne({
      where: { numberPlate: number_plate, exited_at: "null" }
    })
    console.log(result.numberPlate)
    const id = result.id
    await Register.update({ exited_at: new Date() }, { where: { numberPlate: result.numberPlate } })

    switch (result.vehicle_type) {
      case VEHICLE_TYPE.RESIDENT:
        console.log(VEHICLE_TYPE.RESIDENT)
        console.log("PLACA", result.numberPlate)
        await resident({ id })

        break;
      case VEHICLE_TYPE.NON_RESIDENT:
        console.log(VEHICLE_TYPE.NON_RESIDENT)
        console.log("PLACA", result.numberPlate)
        await nonresident({ id })
        break;
      default:
        console.log("OFFICIAL")
        break;
    }

    res.json({ success: true, data: result });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//registers list
controller.list = async (req, res) => {
  try {
    const response = await Register.findAll({


    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

/**
 * get register by numberPlate
 * @param {*} req 
 * @param {*} res 
 */
controller.findOne = async (req, res) => {
  try {
    const { number_plate } = req.params;

    const response = await Register.findAll({
      where: { numberPlate: number_plate }

    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//delete register
controller.delete = async (req, res) => {
  try {

    const { id } = req.params;

    const response = await Register.destroy({
      where: { id: id }
    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}
//update registers
controller.update = async (req, res) => {

  try {

    const { number_plate, vehicle_type, entered_at, exited_at, pay } = req.body;

    const response = await Register.update({
      numberPlate: number_plate,
      vehicle_type: vehicle_type,
      entered_at: entered_at,
      exited_at: exited_at,
      pay: pay

    }, {
      where: { numberPlate: number_plate }
    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}


module.exports = controller;
