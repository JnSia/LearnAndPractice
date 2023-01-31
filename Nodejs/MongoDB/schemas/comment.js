const mongoose = require('mongoose')

const {Schema} = require('mongoose');
const {Types: {ObjectId}} = Schema;

const commentSchema = new Schema({
    commenter: {
        type: ObjectId,
        require: true,
        ref: 'User',
    },
    comment: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Comment', commentSchema)