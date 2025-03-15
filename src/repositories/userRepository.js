import User from "../models/userModel.js";

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export default { createUser, findUserByEmail };
