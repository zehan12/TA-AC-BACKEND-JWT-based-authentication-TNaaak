const router = require("express").Router({mergeParams:true});
const commentController = require("../controllers/commentController");

//* @desc      add comment to Book
//* @route     POST /api/book/bookId/comment/new
router.post( "/:id/new", commentController.addComment );

//* @desc      show all comment of specfic book
//* @route     GET /api/book/bookId/comment
router.get( '/', commentController.showSingleComment );

//* @desc      update a comment of a book
//* @route     PUT /api/book/bookId/comment/commentId/update
router.put( '/:id/update', commentController.updateComment );

//* @desc      delete a comment of a book
//* @route     DELETE /api/book/bookId/comment/commentId/delete
router.delete( '/:id/delete', commentController.deleteComment )

module.exports = router;