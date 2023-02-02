const handler = {};

const controller = require('../controllers/auth')

handler.signup = async (req, res) => {
  try {
    console.log('req', req.body)
    const result = await controller.signup(req.body)
    res.status(201).json({ success: true, result });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

handler.signin = async (req, res) => {
  try {
    const result = await controller.signin(req.body)
    res.status(200).json({ success: true, result });
  }
  catch (e) {
    console.log(e);
    res.status(401).json({ success: false, error: e.message });
  }
}

module.exports = handler;