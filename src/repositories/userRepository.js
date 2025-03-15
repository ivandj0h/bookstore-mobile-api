import User from "../models/userModel.js";

const create = async (userData) => await User.create(userData);
const findByEmail = async (email) => await User.findOne({ email });
const findByUsername = async (username) => await User.findOne({ username });
const findById = async (id) => await User.findById(id);
const findAll = async () => await User.find(); // Tambah ini buat get all

export default { create, findByEmail, findByUsername, findById, findAll };
