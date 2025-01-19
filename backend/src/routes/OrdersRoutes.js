const express = require('express')
const router = express.Router()
const OrdersController = require('../controllers/OrdersController')
const checkAdminPermission = require('../middlewares/checkAdminPermission')
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken);

router.get('/', checkAdminPermission, OrdersController.getAllOrders)
router.get('/:id', OrdersController.getOrderById)
router.get('/user/:userId', OrdersController.getOrderByUserId)
router.post('/', OrdersController.addOrder)
router.put('/:id', checkAdminPermission, OrdersController.updateOrder)
router.patch('/:id', OrdersController.cancelOrder)



module.exports = router