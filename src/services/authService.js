import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import {
  MESSAGE_EMAIL_EXISTS,
  MESSAGE_USERNAME_EXISTS,
  MESSAGE_INVALID_CREDENTIALS,
  MESSAGE_MISSING_FIELDS,
  MESSAGE_LOGIN_FIELDS_REQUIRED,
} from "../constants/userMessages.js";

const register = async (userData) => {
  const { email, username, password } = userData;
  if (!email || !username || !password) {
    throw new Error(MESSAGE_MISSING_FIELDS);
  }

  if (await userRepository.findByEmail(email)) {
    throw new Error(MESSAGE_EMAIL_EXISTS);
  }
  if (await userRepository.findByUsername(username)) {
    throw new Error(MESSAGE_USERNAME_EXISTS);
  }

  return await userRepository.create(userData);
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error(MESSAGE_LOGIN_FIELDS_REQUIRED);
  }

  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error(MESSAGE_INVALID_CREDENTIALS);

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error(MESSAGE_INVALID_CREDENTIALS);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
};

export default { register, login };
