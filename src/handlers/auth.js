const handler = {};

const controller = require('../controllers/auth')

handler.singup = async (req, res) => {
  try {
    const result = await controller.singup(req.body)
    res.status(201).json({ user: result, token: token });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

handler.login = async (req, res) => {
  try {
    const result = await controller.login(req.body)
    res.status(200).json({ user: result, token: token });
  }
  catch (e) {
    console.log(e);
    res.status(401).json({ success: false, error: e.message });
  }
}

module.exports = handler;