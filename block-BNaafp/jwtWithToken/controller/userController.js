const User = require("../models/User");

const register =  async ( req, res, next ) =>  {
    try {
        const { email } = req.body
        const userAlready = await User.findOne( { email } );
        if ( userAlready ) {
            res.status( 201 ).json( { userAlreadyCreated: userAlready } );
        } else { 
            var user = await User.create( req.body );
            res.status( 201 ).json( { user } );
        }
    } catch (error) {
        return next( error )
    }
}

const login =  async ( req, res, next ) =>  {
    try {
        const { email, password } = req.body;
        if ( !email || !password ) {
            return res.status( 400 ).json( { error: "Email & Password is required" } );
        }
        const user = await User.findOne( { email } )
        if ( !user ) {
            return res.status( 400 ).json( { error: "Email not registered" } );
        }
        const result = await user.verifyPassword( String(password) );
        if ( !result ) {
            return res.status( 400 ).json( { error: "Invalid password" } )
        }
        res.status( 201 ).json( { login: result, user } )
    } catch (error) {
        return next( error );
    }
}

module.exports = { register, login };