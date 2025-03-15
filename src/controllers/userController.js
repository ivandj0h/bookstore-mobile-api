import userService from "../services/userService.js";
import responseHandler from "../utils/responseHandler.js";
import {
  RESPONSE_STATUS_SUCCESS,
  RESPONSE_STATUS_BAD_REQUEST,
  RESPONSE_STATUS_NOT_FOUND,
} from "../constants/statusCodes.js";
import { MESSAGE_NOT_FOUND } from "../constants/messages.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      "Users retrieved successfully",
      { users },
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

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
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
      "User retrieved successfully",
      { user },
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

export default { getAllUsers, getUserById };
