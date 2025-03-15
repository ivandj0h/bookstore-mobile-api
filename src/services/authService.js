import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import {
  MESSAGE_EMAIL_EXISTS,
  MESSAGE_USERNAME_EXISTS,
  MESSAGE_INVALID_CREDENTIALS,
} from "../constants/messages.js";

const register = async (userData) => {
  const existingEmail = await userRepository.findUserByEmail(userData.email);
  if (existingEmail) throw new Error(MESSAGE_EMAIL_EXISTS);

  const existingUsername = await userRepository.findUserByUsername(
    userData.username,
  );
  if (existingUsername) throw new Error(MESSAGE_USERNAME_EXISTS);

  userData.password = await bcrypt.hash(userData.password, 10);
  return await userRepository.createUser(userData);
};

const login = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error(MESSAGE_INVALID_CREDENTIALS);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error(MESSAGE_INVALID_CREDENTIALS);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token, user };
};

export default { register, login };
