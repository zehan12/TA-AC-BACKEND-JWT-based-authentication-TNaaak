const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");


//* @desc      list of all books
//* @route     GET /api/book
router.get( "/", bookController.displayAllBook  );

//* @desc      get a single book
//* @route     GET /api/book/:id
router.get( "/:id", bookController.getSingleBook  );

//* @desc      create a book
//* @route     POST /api/book
router.post( "/new", bookController.createBook );

//* @desc      update a book
//* @route     PUT /api/book/:id
router.put( '/:id/update', bookController.updateBook );

//* @desc      delete a book
//* @route     DELETE /api/book/:id
router.delete( "/:id/delete", bookController.deleteBook );

module.exports = router;