const router = require("express").Router({mergeParams:true});
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");

//* @desc      add comment to Book
//* @route     POST /api/book/bookId/comment/new
router.post( "/new", auth.verifyToken, commentController.addComment );

//* @desc      show all comment of specfic book
//* @route     GET /api/book/bookId/comment
router.get( '/', auth.verifyToken, commentController.showSingleComment );

//* @desc      update a comment of a book
//* @route     PUT /api/book/bookId/comment/commentId/update
router.put( '/:id/update', auth.verifyToken, commentController.updateComment );

//* @desc      delete a comment of a book
//* @route     DELETE /api/book/bookId/comment/commentId/delete
router.delete( '/:id/delete', auth.verifyToken, commentController.deleteComment )

module.exports = router;