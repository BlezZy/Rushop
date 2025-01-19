const express = require('express')
const router = express.Router()
const ShippingsController = require('../controllers/ShippingsController')
const checkAdminPermission = require('../middlewares/checkAdminPermission')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', ShippingsController.getAllShippings)
router.get('/:id', ShippingsController.getShippingById)

router.post('/', verifyToken, checkAdminPermission, ShippingsController.addShipping)
router.put('/:id', verifyToken, checkAdminPermission, ShippingsController.updateShipping)
router.delete('/:id', verifyToken, checkAdminPermission, ShippingsController.deleteShipping)


module.exports = router