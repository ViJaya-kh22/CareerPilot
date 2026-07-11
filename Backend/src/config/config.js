import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in Enviroment Variables.")
};

if(!process.env.GOOGLE_GEMINI_API_KEY){
    throw new Error("GOOGLE_GEMINI_API_KEY is not defined in Enviroment Variables.")
};

if(!process.env.JWT_REFRESH_SECRET){
    throw new Error("JWT_REFRESH_SECRET is not defined in Enviroment Variables.")
};
if(!process.env.JWT_ACCESS_SECRET){
    throw new Error("JWT_ACCESS_SECRET is not defined in Enviroment Variables.")
};

const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET,
    GOOGLE_GEMINI_API_KEY : process.env.GOOGLE_GEMINI_API_KEY,
    DEV_MODE : process.env.DEV_MODE === "true",
    NODE_ENV: process.env.NODE_ENV || "development",
}

export default config;