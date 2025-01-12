const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const verifyToken = require('../middlewares/authMiddleware');


router.post('/register', UsersController.registerUser)
router.get('/:id/profile', verifyToken, UsersController.getUserProfileById)
router.put('/:id/profile', verifyToken, UsersController.updateUserProfile)
router.delete('/:id/profile', verifyToken, UsersController.deleteUserProfile)
router.get('/:id/addresses', verifyToken, UsersController.getUserAddresses)
router.post('/:id/addresses', verifyToken, UsersController.addUserAddress)
router.put('/:id/addresses/:addressId', verifyToken, UsersController.updateUserAddress)
router.delete('/:id/addresses/:addressId', verifyToken, UsersController.deleteUserAddress)

module.exports = router;