const handler = {}

//imports
const controller = require('../controllers/registry')


handler.handleCreateEntry = async (req, res) => {
  try {
    const result = await controller.createEntry(req.body)
    res.json({ success: true, data: result });
  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

handler.startMonth = async (req, res) => {
  try {
    const result = await controller.startMonth()
    res.json({ success: true, data: result });
  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

handler.handleCreateExit = async (req, res) => {
  try {
    const result = await controller.createExit(req.body)
    res.json({ success: true, data: result });
  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e.message });
  }
}

//registers list
handler.list = async (req, res) => {
  try {
    const result = await controller.list()
    res.json({ success: true, data: result });
  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

/**
 * get register by numberPlate
 * @param {*} req 
 * @param {*} res 
 */
handler.findOne = async (req, res) => {
  try {
    const { number_plate } = req.params;

    const result = await controller.findAll(number_plate)
    res.json({ success: true, data: result });

  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

//delete register
// handler.delete = async (req, res) => {
//   try {

//     const { id } = req.params;

//     const result = await controller.delete(id)

//     return result


//   } catch (e) {
//        console.error(e)

//     throw e;
//   }
// }
// //update registers
// handler.update = async (req, res) => {

//   try {

//     const { number_plate, vehicle_type, entered_at, exited_at, pay } = req.body;

//     const result = await controller.update({
//       numberPlate: number_plate,
//       vehicle_type: vehicle_type,
//       entered_at: entered_at,
//       exited_at: exited_at,
//       pay: pay

//     }, {
//       where: { numberPlate: number_plate }
//     })
//     res.json({ success: true, data: result });

//   } catch (e) {
//    console.error(e)

//     throw e;
//   }
// }


module.exports = handler;
