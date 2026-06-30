import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blacklistModel from "../models/blacklist.model.js";

/**
 * @name authUser
 * @description Verifies the user's JWT, checks if the token is blacklisted, and attaches the decoded user payload to the request object.
 * @access Private
 */
async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication token not found.",
      });
    }

    const isTokenBlacklisted = await blacklistModel.findOne({ token });

    if (isTokenBlacklisted) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;

    return next();
    
  } catch (error) {
    console.error("Error in authUser middleware:", error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
}

export default authUser;