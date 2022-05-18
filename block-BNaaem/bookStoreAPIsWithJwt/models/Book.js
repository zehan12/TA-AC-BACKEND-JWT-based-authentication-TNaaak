const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ( {
    title: { type: String, required: true, unique: true },
    description: String,
    category: String,
    tags: [ String ],
    commentId: [ { type: Schema.Types.ObjectId, ref:"comment" } ],
    author: { type: String, required: true },
    price: String,
    page: { type: Number, default:293 },
    quantity: { type: Number, default: 1 },
    userId: { type: Schema.Types.ObjectId, ref:"user" }
} , {timestamps: true} );

module.exports = mongoose.model( "Book", bookSchema );