const express = require('express')
const router = express.Router();
const handler = require('../handlers/report')

router.get('/resident', handler.handleMakResidentReport);


module.exports = router