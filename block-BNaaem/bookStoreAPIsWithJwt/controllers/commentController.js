const Comment = require("../models/Comment");
const Book = require("../models/Book");

exports.addComment = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const comments = req.body
        comments.commenter  = req.users.name;
        comments.userId = req.users.userId;
        comments.bookId = bookId;
        console.log(comments)
        const comment = await Comment.create( comments );
        const book = await Book.findByIdAndUpdate(bookId, {
                $push: { commentId: comment._id } });
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
        const { userId } = await Comment.findById( id );
        if ( req.users.userId == userId ) {
            const commentUpdated = Comment.findByIdAndUpdate( id, commentUpdate, { new: true } );
            res.status(200).json({ commentUpdated });
        } else {
            res.status( 400 ).json( { error: `This comment is not created by this user: ${req.users.name}` } )
        }
    } catch ( err ) {
        return next ( err )
    }
} 

exports.deleteComment =  async( req, res, next ) => {
    const bookId = req.params.bookId;
    const id = req.params.id;
    try {
        const { userId } = await Comment.findById( id );
        if ( req.users.userId == userId ) {
            const commentDeleted = await Comment.findByIdAndDelete( id );
            const book = await Book.findByIdAndUpdate( bookId, { $pull : { commentId: commentDeleted._id } } )
            
            res.status(200).json({commentDeleted});
        } else {
            res.status( 400 ).json( { error: `This comment is not created by this user: ${req.users.name}` } )
        }
    } catch ( err ) {
        return next ( err );
    }
}