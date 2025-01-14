const express = require('express')
const router = express.Router()
const ShippingsController = require('../controllers/ShippingsController')

router.get('/', ShippingsController.getAllShippings)
router.get('/:id', ShippingsController.getShippingById)
router.post('/', ShippingsController.addShipping)
router.put('/:id', ShippingsController.updateShipping)
router.delete('/:id', ShippingsController.deleteShipping)


module.exports = router