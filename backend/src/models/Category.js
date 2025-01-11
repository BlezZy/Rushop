const mongoose = require('mongoose')
const pathGeneration = require('../middlewares/pathGeneration')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    path: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

pathGeneration(categorySchema)

const category = mongoose.model('Category', categorySchema);

module.exports = category;