const {
  createUser,
  findUser,
  updateUser,
  deleteUser,
} = require("../data-access/user");

module.exports = class UserService {
  constructor() {}

  async createNewUser(payload, errCallback) {
    //create new user record
    const user = await createUser({
      ...payload,
      errCallback,
    });

    //return user details
    return {
      user,
    };
  }

  async listAllUsers() {
    const users = await findUser({});
    //return all users data
    return {
      users,
    };
  }

  async updateUserData(query, payload, errCallback) {
    return await updateUser(query, payload, errCallback);
  }

  async deleteUserData(filter, errCallback) {
    return await deleteUser(filter, errCallback);
  }
};
