const express = require('express')
const router = express.Router()
const InventoryController = require('../controllers/InventoryController')
const UpdateInventoryController = require("../controllers/InventoryController");

router.get('/', InventoryController.getInventory)
router.get('/:id', InventoryController.getInventoryById)
router.put('/:id', UpdateInventoryController.updateInventory)
router.delete('/:id', InventoryController.removeProductFromInventory)


module.exports = router