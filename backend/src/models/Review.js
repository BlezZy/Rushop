const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 128
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

const review = mongoose.model('Review', reviewSchema);

module.exports = review;