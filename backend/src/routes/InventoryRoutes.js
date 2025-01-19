const express = require('express')
const router = express.Router()
const InventoryController = require('../controllers/InventoryController')
const UpdateInventoryController = require("../controllers/InventoryController");
const checkAdminPermission = require('../middlewares/checkAdminPermission')
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken, checkAdminPermission)

router.get('/', InventoryController.getInventory)
router.get('/:id', InventoryController.getInventoryById)
router.put('/:id', UpdateInventoryController.updateInventory)
router.delete('/:id', InventoryController.removeProductFromInventory)


module.exports = router