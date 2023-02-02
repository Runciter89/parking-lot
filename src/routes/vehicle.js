const express = require('express')
const router = express.Router();
const handler = require('../handlers/vehicle')

router.post('/create_official', handler.handleCreateOfficial);
router.post('/create_resident/', handler.handleCreateResident);
router.get('/', handler.list);
router.put('/:number_plate', handler.update);
router.get('/:number_plate', handler.get);
router.delete('/:number_plate', handler.delete);

module.exports = router