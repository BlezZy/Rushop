const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');


router.post('/register', UsersController.registerUser)
router.get('/:id/profile', UsersController.getUserProfileById)
router.put('/:id/profile', UsersController.updateUserProfile)
router.delete('/:id/profile', UsersController.deleteUserProfile)
router.get('/:id/addresses', UsersController.getUserAddresses)
router.post('/:id/addresses', UsersController.addUserAddress)
router.put('/:id/addresses/:addressId', UsersController.updateUserAddress)

module.exports = router;