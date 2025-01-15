const express = require('express')
const router = express.Router()
const ShippingsController = require('../controllers/ShippingsController')
const checkAdminRole = require('../middlewares/checkAdminRole')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', ShippingsController.getAllShippings)
router.get('/:id', ShippingsController.getShippingById)

router.post('/', verifyToken, checkAdminRole, ShippingsController.addShipping)
router.put('/:id', verifyToken, checkAdminRole, ShippingsController.updateShipping)
router.delete('/:id', verifyToken, checkAdminRole, ShippingsController.deleteShipping)


module.exports = router