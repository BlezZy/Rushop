const express = require('express');
const router = express.Router();
const DiscountsController = require('../controllers/DiscountsController');
const checkAdminPermission = require('../middlewares/checkAdminPermission')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', DiscountsController.getAllDiscounts)
router.get('/:id', DiscountsController.getDiscountById)

router.post('/', verifyToken, checkAdminPermission, DiscountsController.addDiscount)
router.put('/:id', verifyToken, checkAdminPermission, DiscountsController.updateDiscount)
router.delete('/:id', verifyToken, checkAdminPermission, DiscountsController.deleteDiscount)

module.exports = router