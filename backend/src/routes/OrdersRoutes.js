const express = require('express')
const router = express.Router()
const OrdersController = require('../controllers/OrdersController')


router.get('/', OrdersController.getAllOrders)
router.get('/:id', OrdersController.getOrderById)
router.post('/', OrdersController.addOrder)
router.put('/:id', OrdersController.updateOrder)
router.patch('/:id', OrdersController.cancelOrder)



module.exports = router