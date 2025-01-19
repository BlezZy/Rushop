const mongoose = require('mongoose')

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
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})


const category = mongoose.model('Category', categorySchema);

module.exports = category;