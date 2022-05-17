const Comment = require("../models/Comment");
const Book = require("../models/Book");

exports.addComment = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const comments = req.body
        comments.bookId = bookId;
        const comment = await Comment.create( comments );
        const book = await Book.findByIdAndUpdate(bookId, {
                $push: { commentId: comment._id },});
        res.status(200).send(comment);
    } catch (err) {
        return next(err);
    }
}

exports.showSingleComment = async ( req, res, next ) => {
    const bookId = req.params.bookId;
    try {
        const comment = await Comment.find();
        res.status(200).json({comment});
    } catch ( err ) {
        return next( err );
    }
} 

exports.updateComment = async( req, res, next ) => {
    const commentUpdate = req.body;
    const id = req.params.id;
    try {
        const commentUpdated = Comment.findByIdAndUpdate( id, commentUpdate, { new: true } );
        res.status(200).json({ commentUpdated });
    } catch ( err ) {
        return next ( err )
    }
} 

exports.deleteComment =  async( req, res, next ) => {
    const bookId = req.params.bookId;
    const id = req.params.id;
    try {
        const commentDeleted = await Comment.findByIdAndDelete( id );
        const book = await Book.findByIdAndUpdate( bookId, { $pull : { commentId: commentDeleted._id } } )
        res.status(200).json({commentDeleted});
    } catch ( err ) {
        return next ( err );
    }
}