var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

var articleSchema = new Schema( { 
    title: { type: String, required: true, unique: true },
    description: String,
    body: String,
    tagList: [ { type: String } ],
    author: { type: Schema.Types.ObjectId, ref: "user" },
    comments: [ { type: Schema.Types.ObjectId, ref: "comment" } ],
    likes: { type: Number, default: 0 },
    likedBy: [ { type: Schema.Types.ObjectId, ref: "user" } ],
    slug: { type: String, unique: true, slug: "title" }
} )

articleSchema.pre("save", function(next) {
    this.slug = this.title.split(" ").join("-");
    next();
});



module.exports = mongoose.model( "Article", articleSchema );