const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)

router.get('/:userId', CartController.getCart);
router.post('/:userId/items', CartController.addItemToCart);
router.delete('/:userId/items', CartController.removeItemFromCart);
router.delete('/:userId', CartController.clearCart);


module.exports = router;