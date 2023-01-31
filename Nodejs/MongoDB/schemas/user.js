const mongoose = require('mongoose')

const {Schema} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    age: {
        type: Number,
        require: true,
    },
    married: {
        type: Boolean,
        require: true,
    },
    comment: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('User', userSchema)