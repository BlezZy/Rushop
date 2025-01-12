const mongoose = require('mongoose')
const hashPassword = require('../middlewares/hashPassword')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 64
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 64,
    },
    surname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 64,
    },
    addresses: {
        type: [
            {
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
                zipCode: {
                    type: String,
                    required: true,
                    minLength: 5,
                    maxLength: 5
                }

            }
        ]
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

hashPassword(userSchema)



const user = mongoose.model('User', userSchema);

module.exports = user;