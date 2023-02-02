const handler = {}

//imports
const controller = require('../controllers/report')

handler.handleMakResidentReport = async (req, res) => {
  try {
    const result = await controller.makResidentReport(req.query)
    res.json({ success: true, data: result });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e.message });
  }
}

module.exports = handler