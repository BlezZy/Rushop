const ProductController = require('../controllers/ProductsController')
const express = require('express')
const {searchProducts} = require("../controllers/ProductsController");
const router = express.Router()
const checkAdminRole = require('../middlewares/checkAdminRole')
const verifyToken = require('../middlewares/verifyToken')

router.get('/search', searchProducts)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)

router.post('/', verifyToken, checkAdminRole, ProductController.addProduct)
router.put('/:id', verifyToken, checkAdminRole, ProductController.updateProduct)
router.delete('/:id', verifyToken, checkAdminRole, ProductController.deleteProduct)


module.exports = router