import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import {
  RESPONSE_STATUS_UNAUTHORIZED,
  RESPONSE_STATUS_NOT_FOUND,
} from "../constants/statusCodes.js";
import {
  MESSAGE_UNAUTHORIZED,
  MESSAGE_NOT_FOUND,
} from "../constants/userMessages.js";

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log("Token received:", token);
  if (!token) {
    return res.status(RESPONSE_STATUS_UNAUTHORIZED).json({
      success: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userRepository.findById(decoded.id);
    if (!req.user) {
      return res.status(RESPONSE_STATUS_NOT_FOUND).json({
        success: false,
        message: MESSAGE_NOT_FOUND,
      });
    }
    next();
  } catch (error) {
    return res.status(RESPONSE_STATUS_UNAUTHORIZED).json({
      success: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
};

export default { protect };
