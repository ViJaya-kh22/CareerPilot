import mongoose from "mongoose";

/**
 * @description Schema for storing registered user information.
 */

const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : [true, "Username is already taken."],
        required : true,
    },
    email : {
        type : String,
        unique : [true, "Email address is already taken."],
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
});

const userModel = mongoose.model('users', userSchema);

export default userModel;