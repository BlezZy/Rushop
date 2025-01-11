const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 64
    },
    description: {
        type: String,
        required: true,
        maxLength: 300
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    images: {
        type: [String],
        default: []
    },
    producer: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 64,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

const product = mongoose.model('Product', productSchema);

module.exports = product;