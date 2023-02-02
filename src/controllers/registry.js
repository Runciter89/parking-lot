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
  debug('computeStay', register.exited_at, register.entered_at)
  const diff = dateDiff(register.exited_at, register.entered_at);
  debug('raw diff', diff)

  const minutes = Math.abs(Math.floor(diff / (1000 * 60)));
  const result = minutes > 1 ? minutes : 1
  debug('diff minutes', register.exited_at, register.entered_at, result)
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
    throw e
  }
}

controller.startMonth = async () => {
  try {
    const result = await Register.findAll({})
    debug('startMonth', result)

    //reset all RESIDENT vehicle monthly value to 0 and destroy all official vehicle registies
    await Promise.all([
      Vehicle.update(
        { monthly: 0 },
        { where: { vehicle_type: VEHICLE_TYPE.RESIDENT } }
      ),
      Register.destroy({ where: { vehicle_type: VEHICLE_TYPE.OFFICIAL } })
    ])

    return null
  } catch (e) {
    throw e
  }
}

//registrar salida
async function registerExitResident(register) {
  try {
    register.exited_at = new Date()
    const stayMinutes = computeStay(register)

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
    throw e
  }
}

async function registerExitNonResident(register) {
  try {
    register.exited_at = new Date()
    const stayAmount = computeStayAmount(register)

    const result = await Register.update(
      {
        pay: stayAmount,
        exited_at: register.exited_at
      },
      { where: { id: register.id } }
    )

    return result
  } catch (e) {
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

    if (!register) {
      throw new Error('not exist open registers for this vehicle')
    }

    debug('registerExit', register.vehicle_type, register.numberPlate,)
    switch (register.vehicle_type) {
      case VEHICLE_TYPE.RESIDENT:
        await registerExitResident(register)
        break;
      case VEHICLE_TYPE.NON_RESIDENT:
        await registerExitNonResident(register)
        break;
      default:
        await registerExitOfficial(register)
        break;
    }

    return register
  } catch (e) {
    throw e
  }
}


controller.list = async () => {
  try {
    const response = await Register.findAll({
    })
    return response

  } catch (e) {
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
//     throw e
//   }
// }


module.exports = controller;
