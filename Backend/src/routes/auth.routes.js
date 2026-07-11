import express from 'express';
import * as authController from '../controllers/auth.controller.js'
import authUser from '../middlewares/auth.middleware.js';
import  {authLimiter}  from '../middlewares/rateLimit.middleware.js';


const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authLimiter , authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login user
 * @access Public
 */
authRouter.post("/login", authLimiter, authController.loginUserController);

/**
 * @route POST /api/auth/refresh-token
 * @description Rotate refresh token and issue a new access token
 * @access Public
 */
authRouter.post("/refresh-token", authController.refreshTokenController);

/**
 * @route POST /api/auth/logout
 * @description Revoke current session and clear refresh token cookie
 * @access Public
 */
authRouter.post("/logout", authController.logoutUserController);

/**
 * @route POST /api/auth/logout-all
 * @description Revoke all sessions for the user and clear refresh token cookie
 * @access Public
 */
authRouter.post("/logout-all", authController.logoutAllUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get the current logged in user's details
 * @access Private
 */
authRouter.get("/get-me", authUser, authController.getMeController);


export default authRouter;