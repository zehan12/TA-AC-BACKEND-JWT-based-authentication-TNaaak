const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ( {
    content: String,
    bookId: { type: Schema.Types.ObjectId, ref:"book" },
    userId: { type: Schema.Types.ObjectId, ref:"user" },
    // commentBy: { type: String, required: true }
}, { timestamps: true } );

module.exports = mongoose.model( "Comment", commentSchema );