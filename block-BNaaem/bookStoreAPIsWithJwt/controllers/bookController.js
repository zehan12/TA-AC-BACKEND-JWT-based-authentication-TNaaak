const Book = require( "../models/Book" );

exports.displayAllBook = async ( req, res, next ) => {
        try {
            const book = await Book.find();
            res.status( 200 ).json( { book } )
        } catch ( err ) {
            return next ( err );
        }
    }

exports.getSingleBook = async ( req, res, next ) => {
    try {
        const id = req.params.id;
        const singleBook = await Book.findById( id );
        res.status( 200 ).json( { singleBook } );
    } catch (err) {
        return next ( err );
        }
}

exports.createBook = async ( req, res, next ) => {
    try {
        const book = req.body;
        if ( req.body.tags ) {
            book.tags = req.body.tags.split(",");
        }
        const bookCreated = await Book.create( book );
        res.status( 200 ).json( { bookCreated } );
    } catch ( err ) {
        return next ( err );
    }
}

exports.updateBook = async ( req, res, next ) => {
    try {
        const id = req.params.id;
        const bookUpdate = req.body
        const bookUpdated = await Book.findByIdAndUpdate( id, bookUpdate , { new: true } );
        res.status( 200 ).json( { bookUpdated } );
    } catch ( err ) {
        return next ( err )
    }
}  

exports.deleteBook = async ( req, res, next ) => {
    try {
        const id = req.params.id;
        const bookDeleted = await Book.findByIdAndDelete( id );
        const comments = await Comment.deleteMany({bookId:id})
        res.status( 200 ).json( { bookDeleted } );
    } catch ( err ) {
        return next ( err );
    }
}