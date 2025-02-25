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
        maxlength: 300
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
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: "Number must be a integer"
        }
    },
    images: {
        type: [String],
        default: []
    },
    producer: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

const product = mongoose.model('Product', productSchema);

module.exports = product;