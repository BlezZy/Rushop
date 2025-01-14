const ProductController = require('../controllers/ProductsController')
const express = require('express')
const {searchProducts} = require("../controllers/ProductsController");
const router = express.Router()

router.get('/search', searchProducts)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.addProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)


module.exports = router