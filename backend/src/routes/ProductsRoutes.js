const ProductController = require('../controllers/ProductsController')
const express = require('express')
const {searchProducts} = require("../controllers/ProductsController");
const router = express.Router()
const checkAdminPermission = require('../middlewares/checkAdminPermission')
const verifyToken = require('../middlewares/verifyToken')

router.get('/search', searchProducts)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)

router.post('/', verifyToken, checkAdminPermission, ProductController.addProduct)
router.put('/:id', verifyToken, checkAdminPermission, ProductController.updateProduct)
router.delete('/:id', verifyToken, checkAdminPermission, ProductController.deleteProduct)


module.exports = router