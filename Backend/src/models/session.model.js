import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : [true, "User is required"]
    },
    refreshTokenHash : {
        type : String,
        required : [true, "Refresh token hash is required"]
    },
    ip : {
        type : String,
        required : [true, "IP address is required"]
    },
    userAgent : {
        type : String,
        required : [true, "User agent is required"]
    },
    revoked : {
        type : Boolean,
        default : false
    },
    expiresAt : {
        type : Date,
        required : [true, "Expiry date is required"],
        index : { expires : 0 }
    }
}, {
    timestamps : true
});

const sessionModel = mongoose.model("sessions", sessionSchema);

export default sessionModel;