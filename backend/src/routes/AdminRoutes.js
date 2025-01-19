const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/ProductsController')
const UsersController = require('../controllers/UsersController')
const verifyToken = require('../middlewares/verifyToken')
const checkAdminPermission = require('../middlewares/checkAdminPermission')


router.use(verifyToken);
router.use(checkAdminPermission);

router.get('/users', UsersController.getAllUsers)
router.get('/users/:id', UsersController.getUserProfileById)
router.delete('/users/:id', UsersController.deleteUserProfile)

router.get('/products', ProductsController.getAllProducts)
router.post('/products', ProductsController.addProduct)
router.put('/products/:id', ProductsController.updateProduct)
router.delete('/products/:id', ProductsController.deleteProduct)



module.exports = router