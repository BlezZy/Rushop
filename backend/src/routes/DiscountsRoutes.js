const express = require('express');
const router = express.Router();
const DiscountsController = require('../controllers/DiscountsController');
const checkAdminRole = require('../middlewares/checkAdminRole')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', DiscountsController.getAllDiscounts)
router.get('/:id', DiscountsController.getDiscountById)

router.post('/', verifyToken, checkAdminRole, DiscountsController.addDiscount)
router.put('/:id', verifyToken, checkAdminRole, DiscountsController.updateDiscount)
router.delete('/:id', verifyToken, checkAdminRole, DiscountsController.deleteDiscount)

module.exports = router