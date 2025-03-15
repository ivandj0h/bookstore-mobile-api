import User from "../models/userModel.js";

const create = async (userData) => await User.create(userData);
const findByEmail = async (email) => await User.findOne({ email });
const findByUsername = async (username) => await User.findOne({ username });

export default { create, findByEmail, findByUsername };
