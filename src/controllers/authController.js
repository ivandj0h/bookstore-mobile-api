import authService from "../services/authService.js";
import responseHandler from "../utils/responseHandler.js";
import {
  RESPONSE_STATUS_CREATED,
  RESPONSE_STATUS_BAD_REQUEST,
  RESPONSE_STATUS_SUCCESS,
} from "../constants/statusCodes.js";
import {
  MESSAGE_REGISTER_SUCCESS,
  MESSAGE_LOGIN_SUCCESS,
} from "../constants/userMessages.js";

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return responseHandler(
      res,
      RESPONSE_STATUS_CREATED,
      true,
      MESSAGE_REGISTER_SUCCESS,
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

const login = async (req, res) => {
  try {
    const loginData = await authService.login(req.body); // Ambil data langsung dari service

    return responseHandler(
      res,
      RESPONSE_STATUS_SUCCESS,
      true,
      MESSAGE_LOGIN_SUCCESS,
      loginData, // ✅ Kirim data langsung, tanpa membungkus ulang
    );
  } catch (error) {
    return responseHandler(
      res,
      RESPONSE_STATUS_BAD_REQUEST,
      false,
      error.message,
      {},
    );
  }
};

export default { register, login };
