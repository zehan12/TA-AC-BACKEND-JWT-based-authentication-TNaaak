const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports = { 
    verifyToken: async ( req, res, next ) => {
        // console.log(req.headers)
        const token = req.headers.authorization
        try {
            if ( token ) {
                const payload = await jwt.verify( token, process.env.SECRET );
                const { name } = await User.findOne({id:payload.userId})
                payload.name = name
                req.users = payload;
                next();
            } else {
                res.status( 400 ).json( { error: "ACCESS: DENIED! (Token Required)" } );
            }
        } catch (error) {
            return next ( error )
        }
    },
}