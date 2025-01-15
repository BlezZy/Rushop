const express = require('express')
const router = express.Router()
const InventoryController = require('../controllers/InventoryController')
const UpdateInventoryController = require("../controllers/InventoryController");
const checkAdminRole = require('../middlewares/checkAdminRole')
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken, checkAdminRole)

router.get('/', InventoryController.getInventory)
router.get('/:id', InventoryController.getInventoryById)
router.put('/:id', UpdateInventoryController.updateInventory)
router.delete('/:id', InventoryController.removeProductFromInventory)


module.exports = router