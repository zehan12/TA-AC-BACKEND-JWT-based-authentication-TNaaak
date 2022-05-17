const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ( {
    title: { type: String, required: true, unique: true },
    summary: String,
    category: String,
    tags: [ String ],
    commentId: [ { type: Schema.Types.ObjectId, ref:"comment" } ],
    author: { type: String, required: true },
    price: Number,
    quantiy: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref:"user" },
    carteId: { type: Schema.Types.ObjectId, ref:"crate" }
} , {timestamps: true} );

module.exports = mongoose.model( "Book", bookSchema );