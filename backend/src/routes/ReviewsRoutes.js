const express = require('express');
const router = express.Router();
const ReviewsController = require('../controllers/ReviewsController');

router.get('/', ReviewsController.getAllReviews);
router.post('/', ReviewsController.addReview);
router.delete('/:id', ReviewsController.deleteReview);

module.exports = router;