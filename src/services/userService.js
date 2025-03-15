import userRepository from "../repositories/userRepository.js";

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

export default { getAllUsers, getUserById };
