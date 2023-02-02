const handler = {}

//imports
const controller = require('../controllers/user')

//users list
handler.list = async (req, res) => {
  try {
    const response = await controller.list()
    response.forEach(user => { delete user.dataValues.password })
    res.json({ success: true, data: response });
  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

//get user by id
handler.get = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await controller.get(id)

    delete response.dataValues.password
    res.json({ success: true, data: response });

  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

//delete user
handler.delete = async (req, res) => {
  try {

    const { id } = req.params;

    const response = await controller.delete(id)
    res.json({ success: true, data: response });

  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}

//update user
handler.update = async (req, res) => {

  try {
    const { id } = req.params
    const response = await controller.update(id, req.body)
    res.json({ success: true, data: response });

  } catch (e) {
    console.error(e)
    res.json({ success: false, error: e });
  }
}




module.exports = handler;