var path = require('path');
// Warning: Accessing non-existent property 'path' of module exports inside circular dependency

const Article = require("../models/Article");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
    createComment : async ( req, res, next ) => {
        try {
            const slug = req.params.slug;
            const body = req.body
            body.userId = req.users.userId;
            body.author = req.users.name;
            const { _id } = await Article.findOne( { slug } );
            body.articleId = _id;
            const comment = await Comment.create( body );
            await Article.findByIdAndUpdate( _id, { $push:{ comments: comment._id }} );
            await User.findByIdAndUpdate( req.users.userId, { $push:{ commentId: comment._id }} );
            res.json({comment})
        } catch (error) {
            return next ( error )
        }
    },

    getAllComment: async ( req, res, next ) => {
        try {
            const slug = req.params.slug;
            const allComments = await Article.findOne( { slug } ).populate({ path:'comments', model: Comment})
            // const allComments = await Article.findOne( { slug } ).populate( 'comments', 'content author', Comment )
            res.json( allComments )
        } catch (error) {
            return next( error );
        }
    },

    deleteComment : async ( req, res, next ) => {
        try {
            const slug = req.params.slug;
            const commentId = req.params.commentId;
            const { userId, articleId, _id } = await Comment.findOne( { slug } );
            if ( userId == req.users.userId  ) {
                const commentDeleted = await Comment.findByIdAndDelete(_id);
                await Article.findByIdAndUpdate( articleId, { $pull:{ comments: comment._id }} );
                await User.findByIdAndUpdate( req.users.userId, { $pull:{ commentId: comment._id }} );
                res.json( { commentDeleted } )
            } else {
                res.json( { error: "This post is created by you",
            Auth: "Access Denied"} );
            }
        } catch (error) {
            return next( error )
        }
    }
}