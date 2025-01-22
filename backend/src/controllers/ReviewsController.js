const Review = require("../models/Review");
const mongoose = require('mongoose');


const getAllReviews = async (req, res) => {
    try {
        const { productId } = req.query;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required." });
        }

        const aggregateResult = await Review.aggregate([
            { $match: { productId: new mongoose.Types.ObjectId(productId) } },
            {
                $group: {
                    _id: "$productId",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        const reviews = await Review.find({ productId });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                message: "No reviews found for this product.",
                averageRating: null,
                totalReviews: 0
            });
        }

        const { averageRating = 0, totalReviews = 0 } = aggregateResult[0] || {};

        return res.status(200).json({
            averageRating: averageRating.toFixed(2),
            totalReviews,
            reviews
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};


const addReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, rating, comment } = req.body;

        if (!productId || !rating || !comment) {
            return res.status(400).json({ message: "Product ID, rating, and comment are required." });
        }

        const newReview = new Review({
            userId,
            productId,
            rating,
            comment,
        });

        const savedReview = await newReview.save();
        return res.status(201).json({ message: "Review added successfully.", review: savedReview });
    } catch (error) {
        console.error("Error adding review:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if (!reviewId) {
            return res.status(400).json({ message: "Review ID is required." });
        }

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found." });
        }

        return res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    getAllReviews,
    addReview,
    deleteReview,
};
