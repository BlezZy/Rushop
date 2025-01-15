const express = require('express');
const router = express.Router();
const NotificationsController = require('../controllers/NotificationsController');
const checkAdminRole = require('../middlewares/checkAdminRole')
const verifyToken = require('../middlewares/verifyToken')


router.use(verifyToken);

router.get('/', NotificationsController.getNotifications);
router.post('/', checkAdminRole, NotificationsController.createNotification);
router.put('/:id', NotificationsController.markAsRead)
router.delete('/:id', checkAdminRole, NotificationsController.deleteNotification);

module.exports = router