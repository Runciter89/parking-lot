const controller = {}

const EXITED_AT_NULISH_VALUE = null // may be deferent for another db provider
//imports
var { Register, Vehicle, util } = require('../models').sequelizeModels;
const { VEHICLE_TYPE, STAY_TAXES } = require('../shared/constants').enums
const debug = require('debug')('api:controller:register')

const dateDiff = (dt2, dt1) => {
  return (dt2.getTime() - dt1.getTime())
}

const computeStay = (register) => {
  console.log('computeStay', register.exited_at, register.entered_at)
  const diff = dateDiff(register.exited_at, register.entered_at);
  console.log('raw diff', diff)


  const minutes = Math.abs(Math.floor(diff / (1000 * 60)));
  const result = minutes > 1 ? minutes : 1
  console.log('diff minutes', register.exited_at, register.entered_at, result)
  return result
}

const computeStayAmount = (register) => {
  const stay = computeStay(register)
  const minuteTax = STAY_TAXES[register.vehicle_type]
  if (!minuteTax && minuteTax !== 0) {
    throw new Error('Invalid tax configuration')
  }
  return stay * minuteTax
}

controller.createEntry = async (params) => {
  try {
    debug('createEntry', params)
    const { number_plate } = params;

    const [vehicle, openRegistries] = await Promise.all([
      Vehicle.findOne({
        where: { numberPlate: number_plate }
      }),
      Register.findAll({
        where: {
          numberPlate: number_plate,
          exited_at: EXITED_AT_NULISH_VALUE
        }
      })
    ])

    if (openRegistries.length) {
      console.log('bad request. this plate has an open register')
      throw new Error('bad request. this plate has an open register') //TODO: implement  fine grained error management
    }

    let result = null
    if (!vehicle) {
      debug('createEntry', 'vehicle not exist, create register in NOT_RESIDENT mode')
      result = await Register.create({
        numberPlate: number_plate,
        vehicle_type: VEHICLE_TYPE.NON_RESIDENT,
        entered_at: new Date(),
        exited_at: EXITED_AT_NULISH_VALUE
      })
    } else {
      debug('createEntry', `vehicle  exist, create register for plate ${vehicle.numberPlate}`)
      result = await Register.create({
        numberPlate: vehicle.numberPlate,
        vehicle_type: vehicle.vehicle_type,
        entered_at: new Date(),
        exited_at: EXITED_AT_NULISH_VALUE
      })
    }

    return null

  } catch (e) {
    console.log(e);
    throw e
  }
}

controller.startMonth = async () => {
  try {
    const result = await Register.findAll({})
    debug('startMonth', result)

    //reset all RESIDENT vehicle monthly value to 0
    await Promise.all([
      Vehicle.update(
        { monthly: 0 },
        { where: { vehicle_type: VEHICLE_TYPE.RESIDENT } }
      ),
      Register.destroy({ where: { vehicle_type: VEHICLE_TYPE.OFFICIAL } })
    ])

    return null
  } catch (e) {
    console.log(e)
    throw e
  }
}

//registrar salida
async function registerExitResident(register) {
  try {
    console.log('***', register.numberPlate)
    register.exited_at = new Date()
    const stayMinutes = computeStay(register)

    console.log(`from ${register.entered_at} to ${register.exited_at}. minutes`, stayMinutes)

    const [result, _] = await Promise.all([
      Vehicle.update(
        {
          monthly: util.literal(`monthly + ${stayMinutes}`),
          exited_at: register.exited_at
        },
        { where: { numberPlate: register.numberPlate } }
      ),
      Register.update(
        {
          exited_at: register.exited_at
        },
        { where: { id: register.id } }
      )
    ])

    return result
  } catch (e) {
    console.log(e);
    throw e
  }
}

async function registerExitNonResident(register) {
  try {
    register.exited_at = new Date()
    const stayAmount = computeStayAmount(register)
    console.log(`from ${register.entered_at} to ${register.exited_at}. amount`, stayAmount)


    const result = await Register.update(
      {
        pay: stayAmount,
        exited_at: register.exited_at
      },
      { where: { id: register.id } }
    )

    return result
  } catch (e) {
    console.log(e);
    throw e
  }
}

async function registerExitOfficial(register) {
  try {
    register.exited_at = new Date()

    const response = await Register.update(
      {
        exited_at: register.exited_at
      },
      { where: { id: register.id } }
    )

    return response
  } catch (e) {
    console.log(e);
    throw e
  }

}


controller.createExit = async (params) => {
  try {
    debug('createExit', params)
    const { number_plate } = params;

    const register = await Register.findOne({
      where: { numberPlate: number_plate, exited_at: EXITED_AT_NULISH_VALUE }
    })

    console.log('++++', register)
    if (!register) {
      throw new Error('not exist open registers for this vehicle')
    }

    switch (register.vehicle_type) {
      case VEHICLE_TYPE.RESIDENT:
        console.log(VEHICLE_TYPE.RESIDENT)
        console.log("PLACA", register.numberPlate)
        await registerExitResident(register)

        break;
      case VEHICLE_TYPE.NON_RESIDENT:
        console.log(VEHICLE_TYPE.NON_RESIDENT)
        console.log("PLACA", register.numberPlate)
        await registerExitNonResident(register)
        break;
      default:
        console.log("OFFICIAL")
        await registerExitOfficial(register)
        break;
    }

    return register
  } catch (e) {
    console.log(e);
    throw e
  }
}


controller.list = async () => {
  try {
    const response = await Register.findAll({
    })
    return response

  } catch (e) {
    console.log(e);
    throw e;
  }
}

controller.findOne = async (params) => {
  try {
    const { number_plate } = params;

    const response = await Register.findAll({
      where: { numberPlate: number_plate }

    })
    return response;


  } catch (e) {
    console.log(e);
    throw e;
  }
}

//delete register
controller.delete = async (params) => {
  try {

    const { id } = params;

    const response = await Register.destroy({
      where: { id: id }
    })

    return response
  } catch (e) {
    console.log(e);
    throw e
  }
}
//update registers
// controller.update = async (params) => {
//   try {

//     const { number_plate, vehicle_type, entered_at, exited_at, pay } = params;

//     const response = await Register.update({
//       numberPlate: number_plate,
//       vehicle_type: vehicle_type,
//       entered_at: entered_at,
//       exited_at: exited_at,
//       pay: pay
//     }, {
//       where: { numberPlate: number_plate }
//     })
//     return response
//   } catch (e) {
//     console.log(e);
//     throw e
//   }
// }


module.exports = controller;
