const express = require('express');
const router = express.Router();
const ReviewsController = require('../controllers/ReviewsController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdminPermission = require('../middlewares/checkAdminPermission');

router.get('/', ReviewsController.getAllReviews);

router.post('/', verifyToken, ReviewsController.addReview);

router.delete('/:id', verifyToken, checkAdminPermission, ReviewsController.deleteReview);

module.exports = router;
