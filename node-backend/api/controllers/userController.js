const UserService = require("../../services/user");
const { response } = require("../middlewares/utils/response");
const { createNewUser, listAllUsers, updateUserData, deleteUserData } =
  new UserService();

const createUser = async (req, res) => {
  const user = await createNewUser(req.body, (err) => {
    if (err) return res.status(500).json(response(err.message, true, user));
  });

  res.status(201).json(response("User was created Successfully", true, user));
};

const listUsers = async (req, res) => {
  const users = await listAllUsers();
  res.status(200).json(response("Users display list", true, users));
};

const updateUser = async ({ body, params: { user_id } }, res) => {
  const user = await updateUserData({ _id: user_id }, body, (err) => {
    if (err) return res.status(500).json(response(err.message, true, user));
  });

  res
    .status(202)
    .json(response("User information updated Successfully", true, user));
};

const deleteUser = async ({ body, params: { user_id } }, res) => {
  await deleteUserData({ _id: user_id }, (err) => {
    if (err) return res.status(500).json(response(err.message, true));
  });

  res
    //.status(204) //this will prevent response data from displaying
    .status(200)
    .json(response("User information deleted Successfully", true));
};

module.exports = {
  createUser,
  listUsers,
  updateUser,
  deleteUser,
};
