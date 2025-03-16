import userRepository from "../repositories/userRepository.js";
import { MESSAGE_UNAUTHORIZED } from "../constants/userMessages.js";
import cloudinary from "../config/cloudinaryConfig.js";

const getAllUsers = async () => {
  const users = await userRepository.findAll();
  return users.map((user) => {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  });
};

const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (user) {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }
  return null;
};

const updateUser = async (id, updateData, requesterId) => {
  const user = await userRepository.findById(id);
  if (!user) return null;
  console.log(
    "User ID:",
    user._id.toString(),
    "Requester ID:",
    requesterId.toString(),
  );
  if (user._id.toString() !== requesterId.toString())
    throw new Error(MESSAGE_UNAUTHORIZED);

  if (updateData.profileImage) {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "user_profiles" },
        (error, result) => {
          if (error) reject(new Error("Failed to upload image to Cloudinary"));
          else resolve(result);
        },
      );
      uploadStream.end(updateData.profileImage.buffer);
    });
    updateData.profileImage = result.secure_url;
  }

  Object.assign(user, updateData);
  const updatedUser = await user.save();
  const userObj = updatedUser.toObject();
  delete userObj.password;
  return userObj;
};

const deleteUser = async (id, requesterId) => {
  const user = await userRepository.findById(id);
  if (!user) return null;
  if (user._id.toString() !== requesterId)
    throw new Error(MESSAGE_UNAUTHORIZED);

  await userRepository.deleteById(id);
  return user;
};

const uploadUserImage = async (id, imageFile, requesterId) => {
  const user = await userRepository.findById(id);
  if (!user) return null;
  console.log(
    "User ID:",
    user._id.toString(),
    "Requester ID:",
    requesterId.toString(),
  ); // Debug
  if (user._id.toString() !== requesterId.toString())
    throw new Error(MESSAGE_UNAUTHORIZED);

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "user_profiles" },
      (error, result) => {
        if (error) reject(new Error("Failed to upload image to Cloudinary"));
        else resolve(result);
      },
    );
    uploadStream.end(imageFile.buffer);
  });

  user.profileImage = result.secure_url;
  await user.save();
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage,
};
