const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema ( {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 5, required: true }
}, { timestamps: true } );

userSchema.pre( 'save', async function( next ) {
    if ( this.password && this.isModified( 'password' ) ) {
        this.password = await bcyrpt.hash( this.password, 10 );
    }
    next();
} )

userSchema.methods.verifyPassword = async function( password ) {
    try {
        var result = await bcyrpt.compare( password, this.password );
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = mongoose.model( 'User', userSchema );