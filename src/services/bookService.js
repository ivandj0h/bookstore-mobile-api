import bookRepository from "../repositories/bookRepository.js";
import {
  MESSAGE_BOOK_EXISTS,
  MESSAGE_BOOK_TITLE_EXISTS,
  MESSAGE_INVALID_RATING,
} from "../constants/bookMessages.js";
import { MESSAGE_UNAUTHORIZED } from "../constants/userMessages.js";
import cloudinary from "../config/cloudinaryConfig.js";

const createBook = async (bookData, userId) => {
  const { isbn, title, rating } = bookData;
  if (await bookRepository.findByISBN(isbn))
    throw new Error(MESSAGE_BOOK_EXISTS);
  if (await bookRepository.findByTitle(title))
    throw new Error(MESSAGE_BOOK_TITLE_EXISTS.replace("{title}", title));

  if (rating !== undefined && (rating < 0 || rating > 5))
    throw new Error(MESSAGE_INVALID_RATING);

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

  if (
    updateData.rating !== undefined &&
    (updateData.rating < 0 || updateData.rating > 5)
  ) {
    throw new Error(MESSAGE_INVALID_RATING);
  }

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

const bulkUpdateBooks = async (books, requesterId) => {
  const updatedBooks = [];
  for (const { id, updateData } of books) {
    const book = await bookRepository.findById(id);
    if (!book) continue;
    if (book.addedBy._id.toString() !== requesterId.toString()) continue;

    if (
      updateData.rating !== undefined &&
      (updateData.rating < 0 || updateData.rating > 5)
    ) {
      continue; // Skip kalo rating invalid
    }

    Object.assign(book, updateData);
    const updatedBook = await book.save();
    updatedBooks.push(updatedBook);
  }
  return updatedBooks;
};

const bulkDeleteBooks = async (bookIds, requesterId) => {
  const deletedBooks = [];
  for (const id of bookIds) {
    const book = await bookRepository.findById(id);
    if (!book) continue;
    if (book.addedBy._id.toString() !== requesterId.toString()) continue;

    await bookRepository.deleteById(id);
    deletedBooks.push(book);
  }
  return deletedBooks;
};

export default {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  uploadBookImage,
  bulkUpdateBooks,
  bulkDeleteBooks,
};
