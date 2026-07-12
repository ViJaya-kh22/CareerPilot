import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

/** import all the routes  */
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.ai.routes.js';


const app = express();

const allowedOrigins = [
  "http://localhost:5173",          // local dev frontend
  process.env.FRONTEND_URL,         // deployed frontend
].filter(Boolean); 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}))


/** API prefix */
app.use("/api/auth" , authRouter);
app.use("/api/interview" , interviewRouter)

export default app;