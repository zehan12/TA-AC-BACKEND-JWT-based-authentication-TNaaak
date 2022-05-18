const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");
const auth = require("../middlewares/auth");


//* @desc      list of all books
//* @route     GET /api/book
router.get( "/", auth.verifyToken, bookController.displayAllBook  );

//* @desc      get a single book
//* @route     GET /api/book/:id
router.get( "/:id", auth.verifyToken, bookController.getSingleBook  );

//* @desc      create a book
//* @route     POST /api/book
router.post( "/new", auth.verifyToken, bookController.createBook );

//* @desc      update a book
//* @route     PUT /api/book/:id
router.put( '/:id/update', auth.verifyToken, bookController.updateBook );

//* @desc      delete a book
//* @route     DELETE /api/book/:id
router.delete( "/:id/delete", auth.verifyToken, bookController.deleteBook );

module.exports = router;