const express = require('express')
const router = express.Router();
const handler = require('../handlers/auth')

router.post('/signup', handler.signup);
router.post('/signin', handler.signin);

module.exports = router