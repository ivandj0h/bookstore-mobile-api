import User from "../models/userModel.js";

const create = async (userData) => await User.create(userData);
const findByEmail = async (email) => await User.findOne({ email });
const findByUsername = async (username) => await User.findOne({ username });
const findById = async (id) => await User.findById(id);
const findAll = async () => await User.find();
const deleteById = async (id) => await User.findByIdAndDelete(id);

export default {
  create,
  findByEmail,
  findByUsername,
  findById,
  findAll,
  deleteById,
};
