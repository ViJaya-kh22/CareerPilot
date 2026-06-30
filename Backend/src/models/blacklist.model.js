import mongoose from "mongoose";

/**
 * @description Schema for storing blacklisted JWT tokens after user logout.
 */

const blacklistTokenSchema = mongoose.Schema({
    token :{
        type : String,
        required : [true, "Token is required to add in blacklist."]
    },
},{
    timestamps : true
});

const blacklistModel = mongoose.model('blacklistTokens', blacklistTokenSchema);

export default blacklistModel;