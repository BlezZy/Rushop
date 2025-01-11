const mongoose = require("mongoose");
const calculateTotalPrice = require('../middlewares/calculateTotalPrice')


const shippingAddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64
    },
    city: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64
    },
    country: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64
    },
    zipcode: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 5
    }
})

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    shippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shipping",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        default: 'credit_card'
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


calculateTotalPrice(orderSchema)

const order = mongoose.model('Order', orderSchema);
module.exports = order;