const express = require('express')
const router = express.Router();
const handler = require('../handlers/user')

router.get('/', handler.list);
router.get('/:id', handler.get);
router.put('/:id', handler.update);
router.delete('/:id', handler.delete);



module.exports = router