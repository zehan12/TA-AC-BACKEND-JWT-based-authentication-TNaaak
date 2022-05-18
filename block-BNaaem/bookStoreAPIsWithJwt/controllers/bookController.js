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
        book.userId = req.users.userId;
        if ( req.body.title != "" ) {
            if ( req.body.tags ) {
                book.tags = req.body.tags.split(",");
            }
            if ( req.body.category ) {
                book.category = req.body.category.charAt(0).toUpperCase()+req.body.category.slice(1);
            }
            const bookCreated = await Book.create( book );
            res.status( 200 ).json( { bookCreated } );
        }
    } catch ( err ) {
        return next ( err );
    }
}

exports.updateBook = async ( req, res, next ) => {
    try {
        const id = req.params.id;
        const bookUpdate = req.body
        const { userId } = await Book.findById( id );
        if ( bookUpdate.title != "" ) {
            if ( req.users.userId == userId  ){
                const bookUpdated = await Book.findByIdAndUpdate( id, bookUpdate , { new: true } );
                res.status( 200 ).json( { bookUpdated } );
            } else {
                res.status( 200 ).json( { error: `This book is not created by this user with email: ${req.users.email}` } )
            }
        }
    } catch ( err ) {
        return next ( err )
    }
}  

exports.deleteBook = async ( req, res, next ) => {
    try {
        const id = req.params.id;
        const { userId } = await Book.findById( id );
        if ( req.users.userId == userId  ){
            const bookDeleted = await Book.findByIdAndDelete( id );
            if ( bookDeleted.bookId.length >= 1 ) {
                const comment = await Comment.deleteMany( { bookId: id } );
                if ( comment.usersId ) {

                }
            }
            res.status( 200 ).json( { bookDeleted } );
        } else {
            res.status( 200 ).json( { error: `This book is not created by this user: ${req.users.name}` } )
        }
    } catch ( err ) {
        return next ( err );
    }
}