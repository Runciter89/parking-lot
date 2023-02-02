const express = require('express')
const router = express.Router();
const handler = require('../handlers/registry')

router.post('/entry', handler.handleCreateEntry);
router.put('/exit', handler.handleCreateExit);
router.put('/start_month', handler.startMonth);
router.get('/', handler.list);
// router.delete('/:id', handler.delete);
// router.put('/:id', handler.update);
router.get('/:id', handler.findOne);

module.exports = router