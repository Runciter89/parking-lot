const handler = {}
//imports
var { Vehicle } = require('../models').sequelizeModels;
const controller = require('../controllers/vehicle')


//create official
handler.handleCreateOfficial = async (req, res) => {
  try {
    const result = await controller.createOfficial(req.body)
    res.json({ success: true, data: result });

  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

//create resident
handler.handleCreateResident = async (req, res) => {
  try {
    const result = await controller.createResident(req.body)
    res.json({ success: true, data: result });
  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

//vehicle list
handler.list = async (req, res) => {
  try {
    const result = await Vehicle.findAll()
    res.json({ success: true, data: result });
  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

//get vehicle by numberPlate
handler.get = async (req, res) => {
  try {
    const { number_plate } = req.params;

    const result = await controller.get(number_plate)
    if (!result) {
      res.status(404).body({ success: true, data: result });
    }
    res.json({ success: true, data: result });

  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

//delete vehicle
handler.delete = async (req, res) => {
  try {

    const { number_plate } = req.params;

    const result = await controller.delete(number_plate)
    res.json({ success: true, data: result });

  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}
//update vehicle
handler.update = async (req, res) => {

  try {
    const { number_plate } = req.params;
    const result = await controller.update(number_plate, req.body)
    res.json({ success: true, data: result });

  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

module.exports = handler;