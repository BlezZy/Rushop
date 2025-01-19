const express = require('express');
const router = express.Router();
const NotificationsController = require('../controllers/NotificationsController');
const checkAdminPermission = require('../middlewares/checkAdminPermission')
const verifyToken = require('../middlewares/verifyToken')


router.use(verifyToken);

router.get('/', NotificationsController.getNotifications);
router.post('/', checkAdminPermission, NotificationsController.createNotification);
router.put('/:id', NotificationsController.markAsRead)
router.delete('/:id', checkAdminPermission, NotificationsController.deleteNotification);

module.exports = router