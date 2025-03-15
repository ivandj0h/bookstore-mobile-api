import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

const register = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) throw new Error("Email already exists");

  userData.password = await bcrypt.hash(userData.password, 10);
  return await userRepository.createUser(userData);
};

const login = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token, user };
};

export default { register, login };
