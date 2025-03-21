import bookService from "../services/bookService.js";
import responseHandler from "../utils/responseHandler.js";
import {
  RESPONSE_STATUS_CREATED,
  RESPONSE_STATUS_SUCCESS,
  RESPONSE_STATUS_BAD_REQUEST,
  RESPONSE_STATUS_NOT_FOUND,
  RESPONSE_STATUS_UNAUTHORIZED,
} from "../constants/statusCodes.js";
import {
  MESSAGE_BOOK_CREATED,
  MESSAGE_BOOKS_RETRIEVED,
  MESSAGE_BOOK_RETRIEVED,
  MESSAGE_BOOK_UPDATED,
  MESSAGE_BOOK_DELETED,
  MESSAGE_BOOK_IMAGE_UPLOADED,
  MESSAGE_BOOK_NOT_FOUND,
  MESSAGE_UNAUTHORIZED,
} from "../constants/bookMessages.js";

const createBook = async (req, res) => {
  try {
    const bookData = req.body;
    if (req.file) bookData.imageUrl = req.file;
    const book = await bookService.createBook(bookData, req.user._id);
    return responseHandler(
      res,
      RESPONSE_STATUS_CREATED,
      true,
      MESSAGE_BOOK_CREATED,
      { book },
    );
  } catch (error) {
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
    );
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_BOOKS_RETRIEVED,
      { books },
    );
  } catch (error) {
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
    );
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book)
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_BOOK_NOT_FOUND,
      );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_BOOK_RETRIEVED,
      { book },
    );
  } catch (error) {
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
    );
  }
};

const updateBook = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) updateData.imageUrl = req.file;
    const book = await bookService.updateBook(
      req.params.id,
      updateData,
      req.user._id,
    );
    if (!book)
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_BOOK_NOT_FOUND,
      );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_BOOK_UPDATED,
      { book },
    );
  } catch (error) {
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
    );
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await bookService.deleteBook(req.params.id, req.user._id);
    if (!book)
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_BOOK_NOT_FOUND,
      );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_BOOK_DELETED,
      {},
    );
  } catch (error) {
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
    );
  }
};

const uploadBookImage = async (req, res) => {
  try {
    console.log("Request file:", req.file);
    if (!req.file) throw new Error("No image file provided");
    const book = await bookService.uploadBookImage(
      req.params.id,
      req.file,
      req.user._id,
    );
    if (!book)
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_BOOK_NOT_FOUND,
      );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_BOOK_IMAGE_UPLOADED,
      { book },
    );
  } catch (error) {
    console.log("Upload error:", error.message);
    let status = RESPONSE_STATUS_BAD_REQUEST;
    if (error.message === MESSAGE_UNAUTHORIZED)
      status = RESPONSE_STATUS_UNAUTHORIZED;
    return responseHandler(res, status, false, error.message);
  }
};

const bulkUpdateBooks = async (req, res) => {
  try {
    const { books } = req.body; // Expect array of { id, updateData }
    if (!Array.isArray(books) || books.length === 0)
      throw new Error("Books array is required and cannot be empty");

    const updatedBooks = await bookService.bulkUpdateBooks(books, req.user._id);
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      "Books updated successfully",
      { updatedBooks },
    );
  } catch (error) {
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
    );
  }
};

const bulkDeleteBooks = async (req, res) => {
  try {
    const { bookIds } = req.body; // Expect array of book IDs
    if (!Array.isArray(bookIds) || bookIds.length === 0)
      throw new Error("Book IDs array is required and cannot be empty");

    const deletedBooks = await bookService.bulkDeleteBooks(
      bookIds,
      req.user._id,
    );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      "Books deleted successfully",
      { deletedBooks },
    );
  } catch (error) {
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
    );
  }
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
