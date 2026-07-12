import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import crypto from 'crypto'
import sessionModel from "../models/session.model.js";

// shared cookie options so all three spots (register/login/refresh) always stay in sync
const getRefreshCookieOptions = () => ({
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: config.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

/**
 * @name registerUserController
 * @description Registers a new user. Expects username, email, and password in the request body.
 * @access Public
 */
export async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email, and password.",
      });
    }

    const isUserExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExists) {
      return res.status(409).json({
        message: "User already exists.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const refreshToken = jwt.sign(
      { id: user._id, type: "refresh" },
      config.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    const accessToken = jwt.sign(
      { id: user._id, sessionId: session._id, type: 'access' },
      config.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('refreshToken', refreshToken, getRefreshCookieOptions());

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken
    });

  } catch (error) {
    console.error("Error in registerUserController:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

/**
 * @name loginUserController
 * @description Authenticates an existing user. Expects email and password in the request body.
 * @access Public
 */
export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const refreshToken = jwt.sign(
      { id: user._id, type: 'refresh' },
      config.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    const accessToken = jwt.sign(
      { id: user._id, sessionId: session._id, type: 'access' },
      config.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('refreshToken', refreshToken, getRefreshCookieOptions());

    return res.status(200).json({
      message: "User logged in successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken
    });

  } catch (error) {
    console.error("Error in loginUserController:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}


/**
 * @name refreshTokenController
 * @description Verifies the refresh token cookie, rotates it, and issues a new access token.
 * @access Public
 */
export async function refreshTokenController(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found." });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

    if (decoded.type !== "refresh") {
      return res.status(401).json({ message: "Invalid token type." });
    }

    const userDoc = await userModel.findById(decoded.id).select("-password");

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized or expired session." });
    }

    // rotate: issue new refresh token, update session
    const newRefreshToken = jwt.sign(
      { id: decoded.id, type: "refresh" },
      config.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    const newRefreshTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');

    session.refreshTokenHash = newRefreshTokenHash;
    session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await session.save();

    const accessToken = jwt.sign(
      { id: decoded.id, sessionId: session._id, type: "access" },
      config.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie("refreshToken", newRefreshToken, getRefreshCookieOptions());

    return res.status(200).json({
      message: "Access token generated successfully.",
      accessToken,
      user : {
        id : userDoc._id,
        username : userDoc.username,
        email : userDoc.email,
      }
    });

  } catch (error) {
    console.error("Error in refreshTokenController:", error);
    return res.status(401).json({ message: "Invalid or expired refresh token." });
  }
}

/**
 * @name logoutUserController
 * @description Logs out the current session by revoking it and clearing the refresh token cookie.
 * @access Private
 */
export async function logoutUserController(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token not found." });
    }

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    await sessionModel.findOneAndUpdate(
      { refreshTokenHash, revoked: false },
      { revoked: true }
    );

    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    console.error("Error in logoutUserController:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

/**
 * @name logoutAllUserController
 * @description Logs out the user from all devices by revoking every active session.
 * @access Private
 */
export async function logoutAllUserController(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token not found." });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

    await sessionModel.updateMany(
      { user: decoded.id, revoked: false },
      { revoked: true }
    );

    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logged out from all devices successfully." });
  } catch (error) {
    console.error("Error in logoutAllUserController:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

/**
 * @name getMeController
 * @description Retrieves the authenticated user's profile information.
 * @access Private
 */
export async function getMeController(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User details fetched successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in getMeController:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}