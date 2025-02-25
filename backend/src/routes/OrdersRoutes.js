const express = require('express')
const router = express.Router()
const OrdersController = require('../controllers/OrdersController')
const checkAdminPermission = require('../middlewares/checkAdminPermission')
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken);

router.get('/', checkAdminPermission, OrdersController.getAllOrders)
router.get('/user', OrdersController.getAllOrdersByUserId)
router.get('/:id', OrdersController.getOrderById)
router.post('/', OrdersController.addOrder)
router.put('/:id', checkAdminPermission, OrdersController.updateOrder)
router.put('/:id/confirm', OrdersController.confirmOrder)
router.patch('/:id/cancel', OrdersController.cancelOrder)



module.exports = router