import bookRepository from "../repositories/bookRepository.js";
import {
  MESSAGE_BOOK_EXISTS,
  MESSAGE_BOOK_TITLE_EXISTS,
} from "../constants/bookMessages.js";
import { MESSAGE_UNAUTHORIZED } from "../constants/userMessages.js";
import cloudinary from "../config/cloudinaryConfig.js";

const createBook = async (bookData, userId) => {
  const { isbn, title } = bookData;
  if (await bookRepository.findByISBN(isbn))
    throw new Error(MESSAGE_BOOK_EXISTS);
  if (await bookRepository.findByTitle(title))
    throw new Error(MESSAGE_BOOK_TITLE_EXISTS.replace("{title}", title));

  if (bookData.imageUrl) {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "book_covers" },
        (error, result) => {
          if (error) reject(new Error("Failed to upload image to Cloudinary"));
          else resolve(result);
        },
      );
      uploadStream.end(bookData.imageUrl.buffer);
    });
    bookData.imageUrl = result.secure_url;
  }

  bookData.addedBy = userId;
  return await bookRepository.create(bookData);
};

const getAllBooks = async () => await bookRepository.findAll();
const getBookById = async (id) => await bookRepository.findById(id);

const updateBook = async (id, updateData, requesterId) => {
  const book = await bookRepository.findById(id);
  if (!book) return null;
  console.log(
    "Book addedBy ID:",
    book.addedBy._id.toString(),
    "Requester ID:",
    requesterId.toString(),
  );
  if (book.addedBy._id.toString() !== requesterId.toString())
    throw new Error(MESSAGE_UNAUTHORIZED);

  if (updateData.imageUrl) {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "book_covers" },
        (error, result) => {
          if (error) reject(new Error("Failed to upload image to Cloudinary"));
          else resolve(result);
        },
      );
      uploadStream.end(updateData.imageUrl.buffer);
    });
    updateData.imageUrl = result.secure_url;
  }

  Object.assign(book, updateData);
  return await book.save();
};

const deleteBook = async (id, requesterId) => {
  const book = await bookRepository.findById(id);
  if (!book) return null;
  console.log(
    "Book addedBy ID:",
    book.addedBy._id.toString(),
    "Requester ID:",
    requesterId.toString(),
  );
  if (book.addedBy._id.toString() !== requesterId.toString())
    throw new Error(MESSAGE_UNAUTHORIZED);

  await bookRepository.deleteById(id);
  return book;
};

const uploadBookImage = async (id, imageFile, requesterId) => {
  const book = await bookRepository.findById(id);
  if (!book) return null;
  console.log(
    "Book addedBy ID:",
    book.addedBy._id.toString(),
    "Requester ID:",
    requesterId.toString(),
  );
  if (book.addedBy._id.toString() !== requesterId.toString())
    throw new Error(MESSAGE_UNAUTHORIZED);

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "book_covers" },
      (error, result) => {
        if (error) reject(new Error("Failed to upload image to Cloudinary"));
        else resolve(result);
      },
    );
    uploadStream.end(imageFile.buffer);
  });

  book.imageUrl = result.secure_url;
  return await book.save();
};

export default {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  uploadBookImage,
};
