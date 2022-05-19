const User = require('../models/User');

module.exports = {
    getUsername: async ( req, res, next ) => {
        try {
            console.log(req.params.username)
            const username = req.params.username;
            const user = await User.findOne( { username } );
            if ( user ) {
                res.status( 200 ).json( { user } )
            } else {
                res.status( 400 ).json( { error: "user not found!" } )
            }
        } catch (error) {
            return next(error)
        }
    },

    followUser: async ( req, res, next ) => {
        try {
            const username = req.params.username;
            const userToFollow = await User.findOne( { username } );
            if ( !userToFollow ) {
                res.status( 400 ).json( { error: "User not found" } )
            } 
            if ( req.users.userId == userToFollow._id ) {
                res.status( 400 ).json( { error: "you can't follow yourself" } )
            }
            const user = await User.findByIdAndUpdate( req.users.userId, { $push: { following: userToFollow._id } }, { new: true } );
            res.status( 200 ).json( { msg:`${user.username} follow ${userToFollow.username}`, user: user  } )
        } catch (error) {
            return next ( error );
        }
    },

    unfollowUser: async ( req, res, next ) => {
        try {
            
        } catch (error) {
            return next ( error );
        }
    }

}