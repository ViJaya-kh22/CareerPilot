import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    try {
      await mongoose.connect(config.MONGO_URI)
      console.log("Connected to database successfully.")
    } catch (error) {
         console.log("Error in connectDB:" + error)
    }
};

export default connectDB;