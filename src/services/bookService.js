import bookRepository from "../repositories/bookRepository.js";
import {
  MESSAGE_BOOK_EXISTS,
  MESSAGE_BOOK_TITLE_EXISTS,
} from "../constants/messages.js";

const createBook = async (bookData, userId) => {
  const { isbn, title } = bookData;

  // Cek duplikat ISBN
  if (await bookRepository.findByISBN(isbn)) {
    throw new Error(MESSAGE_BOOK_EXISTS);
  }

  // Cek duplikat judul
  if (await bookRepository.findByTitle(title)) {
    throw new Error(MESSAGE_BOOK_TITLE_EXISTS.replace("{title}", title));
  }

  bookData.addedBy = userId; // Tambah user yang nambah buku
  return await bookRepository.create(bookData);
};

const getAllBooks = async () => await bookRepository.findAll();
const getBookById = async (id) => await bookRepository.findById(id);

export default { createBook, getAllBooks, getBookById };
