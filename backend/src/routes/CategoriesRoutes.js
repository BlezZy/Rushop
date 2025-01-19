const express = require('express');
const router = express.Router()
const CategoriesController = require('../controllers/CategoriesController')
const checkAdminPermission = require('../middlewares/checkAdminPermission')
const verifyToken = require('../middlewares/verifyToken')


router.get('/', CategoriesController.getAllCategories)
router.get('/:id', CategoriesController.getCategoryById)

router.post('/', verifyToken, checkAdminPermission, CategoriesController.addCategory)
router.put('/:id', verifyToken, checkAdminPermission, CategoriesController.updateCategory)
router.delete('/:id', verifyToken, checkAdminPermission, CategoriesController.deleteCategory)


module.exports = router