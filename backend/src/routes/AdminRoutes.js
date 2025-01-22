const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdminPermission = require('../middlewares/checkAdminPermission');

router.use(verifyToken);
router.use(checkAdminPermission);

router.get('/users', AdminController.getAllUsers);
router.get('/users/:id', AdminController.getUserById);
router.delete('/users/:id', AdminController.deleteUserById);

router.get('/products', AdminController.getAllProducts);
router.post('/products', AdminController.addProduct);
router.put('/products/:id', AdminController.updateProduct);
router.delete('/products/:id', AdminController.deleteProduct);
module.exports = router;
