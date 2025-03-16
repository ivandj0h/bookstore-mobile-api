import userService from "../services/userService.js";
import responseHandler from "../utils/responseHandler.js";
import {
  RESPONSE_STATUS_SUCCESS,
  RESPONSE_STATUS_BAD_REQUEST,
  RESPONSE_STATUS_NOT_FOUND,
} from "../constants/statusCodes.js";
import {
  MESSAGE_NOT_FOUND,
  MESSAGE_USERS_RETRIEVED,
  MESSAGE_USER_RETRIEVED,
  MESSAGE_USER_UPDATED,
  MESSAGE_USER_DELETED,
  MESSAGE_PROFILE_IMAGE_UPLOADED,
} from "../constants/userMessages.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_USERS_RETRIEVED,
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
    if (!user)
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_NOT_FOUND,
      );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_USER_RETRIEVED,
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

const updateUser = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) updateData.profileImage = req.file; // Tambah file kalo ada
    const user = await userService.updateUser(
      req.params.id,
      updateData,
      req.user._id,
    );
    if (!user)
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_NOT_FOUND,
      );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_USER_UPDATED,
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

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id, req.user._id);
    if (!user)
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_NOT_FOUND,
      );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_USER_DELETED,
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

const uploadUserImage = async (req, res) => {
  try {
    console.log("Request file:", req.file);
    if (!req.file) throw new Error("No image file provided");
    const user = await userService.uploadUserImage(
      req.params.id,
      req.file,
      req.user._id,
    );
    if (!user)
      return responseHandler(
        res,
        RESPONSE_STATUS_NOT_FOUND,
        false,
        MESSAGE_NOT_FOUND,
      );
    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_PROFILE_IMAGE_UPLOADED,
      { user },
    );
  } catch (error) {
    console.log("Upload error:", error.message);
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
    );
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage,
};
