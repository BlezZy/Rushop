const Review = require("../models/Review");

const getAllReviews = async (req, res) => {
    try {
        const allReviews = await Review.find()

        if(!allReviews) {
            return res.status(404).json({message: "Reviews not found"})
        }

        return res.status(200).json(allReviews)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const addReview = async (req, res) => {
    try {
        const review = req.body;

        if (!review) {
            return res.status(400).json({message: "Request body empty"})
        }

        const newReview = new Review(review)
        const savedReview = await newReview.save()
        return res.status(200).json(savedReview)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({message: "Invalid ID format"})
        }

        const deleteReview = await Review.findByIdAndDelete(id)

        if (!deleteReview) {
            return res.status(404).json({message: "Review not found"})
        }

        return res.status(200).json({message: "Review deleted successfully"})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}



module.exports = {
    getAllReviews,
    addReview,
    deleteReview,


}