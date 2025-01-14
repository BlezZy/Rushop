const express = require('express');
const router = express.Router();
const DiscountsController = require('../controllers/DiscountsController');

router.get('/', DiscountsController.getAllDiscounts)
router.get('/:id', DiscountsController.getDiscountById)
router.post('/', DiscountsController.addDiscount)
router.put('/:id', DiscountsController.updateDiscount)
router.delete('/:id', DiscountsController.deleteDiscount)

module.exports = router