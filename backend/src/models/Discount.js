const mongoose = require('mongoose');


const discountSchema = new mongoose.Schema({
    appliesTo: {
        type: {
            type: String,
            required: true,
            enum: ['Product', 'Category']
        },
        value: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'appliesTo.type'
        }
    },
    type: {
        type: String,
        required: true,
        enum: ['percentage', 'fixed']
    },
    value: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }
}, {versionKey: false})

const discount = new mongoose.model('Discount', discountSchema);
module.export = discount;