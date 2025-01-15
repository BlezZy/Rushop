const express = require('express')
const router = express.Router()
const OrdersController = require('../controllers/OrdersController')
const checkAdminRole = require('../middlewares/checkAdminRole')
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken);

router.get('/', checkAdminRole, OrdersController.getAllOrders)
router.get('/:id', OrdersController.getOrderById)
router.post('/', OrdersController.addOrder)
router.put('/:id', checkAdminRole, OrdersController.updateOrder)
router.patch('/:id', OrdersController.cancelOrder)



module.exports = router