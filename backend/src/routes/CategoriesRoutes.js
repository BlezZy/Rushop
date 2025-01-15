const express = require('express');
const router = express.Router()
const CategoriesController = require('../controllers/CategoriesController')
const checkAdminRole = require('../middlewares/checkAdminRole')
const verifyToken = require('../middlewares/verifyToken')


router.get('/', CategoriesController.getAllCategories)
router.get('/:id', CategoriesController.getCategoryById)

router.post('/', verifyToken, checkAdminRole, CategoriesController.addCategory)
router.put('/:id', verifyToken, checkAdminRole, CategoriesController.updateCategory)
router.delete('/:id', verifyToken, checkAdminRole, CategoriesController.deleteCategory)


module.exports = router