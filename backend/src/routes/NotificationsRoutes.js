const express = require('express');
const router = express.Router();
const NotificationsController = require('../controllers/NotificationsController');


router.get('/', NotificationsController.getNotifications);
router.post('/', NotificationsController.createNotification);
router.put('/:id', NotificationsController.markAsRead)
router.delete('/:id', NotificationsController.deleteNotification);

module.exports = router