const User = require("../models/user");

const findOneUser = async (query) => {
  return await User.findOne(query);
};

const createUser = async (payload, errCallback) => {
  return await User.create(payload, errCallback);
};

const findUser = async (query) => {
  return await User.find(query).sort({ date: -1 });
};

const updateUser = async (filter, update, errCallback) => {
  return await User.findOneAndUpdate(
    filter,
    update,
    { new: true },
    errCallback
  );
};

const deleteUser = async (filter, errCallback) => {
  return await User.deleteOne(filter, errCallback);
};

module.exports = {
  findOneUser,
  createUser,
  findUser,
  updateUser,
  deleteUser,
};
