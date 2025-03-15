import bookService from "../services/bookService.js";
import responseHandler from "../utils/responseHandler.js";
import {
  RESPONSE_STATUS_CREATED,
  RESPONSE_STATUS_SUCCESS,
  RESPONSE_STATUS_BAD_REQUEST,
  RESPONSE_STATUS_NOT_FOUND,
} from "../constants/statusCodes.js";
import { MESSAGE_NOT_FOUND } from "../constants/messages.js";

const createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body, req.user._id);
    return responseHandler(
      res,
      RESPONSE_STATUS_CREATED,
      true,
      "Book created successfully",
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
      "Books retrieved successfully",
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
    if (!book) {
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_NOT_FOUND,
      );
    }
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      "Book retrieved successfully",
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

export default { createBook, getAllBooks, getBookById };
