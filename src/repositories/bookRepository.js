import Book from "../models/bookModel.js";

const create = async (bookData) => await Book.create(bookData);
const findAll = async () =>
  await Book.find().populate("addedBy", "username email");
const findById = async (id) =>
  await Book.findById(id).populate("addedBy", "username email");
const findByISBN = async (isbn) => await Book.findOne({ isbn });
const findByTitle = async (title) => await Book.findOne({ title });

export default { create, findAll, findById, findByISBN, findByTitle };
