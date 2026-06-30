import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blacklistModel from "../models/blacklist.model.js";

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

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      config.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in registerUserController:", error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
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
      return res.status(401).json({
        message: "Unauthorized user.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      config.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginUserController:", error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
}

/**
 * @name logoutUserController
 * @description Logs out the authenticated user by clearing the authentication cookie and blacklisting the current token.
 * @access Private
 */
export async function logoutUserController(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await blacklistModel.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully.",
    });
  } catch (error) {
    console.error("Error in logoutUserController:", error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
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
      return res.status(404).json({
        message: "User not found.",
      });
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

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
}
