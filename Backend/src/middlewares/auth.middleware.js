import jwt from "jsonwebtoken";
import config from "../config/config.js";

/**
 * @name authUser
 * @description Verifies the user's access token from the Authorization header and attaches the decoded payload to the request object.
 * @access Private
 */
async function authUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication token not found.",
      });
    }

    const accessToken = authHeader.split(" ")[1];

    const decoded = jwt.verify(accessToken, config.JWT_ACCESS_SECRET);

    if (decoded.type !== "access") {
      return res.status(401).json({
        message: "Invalid token type.",
      });
    }

    req.user = decoded;

    return next();

  } catch (error) {
    console.error("Error in authUser middleware:", error);
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
}

export default authUser;