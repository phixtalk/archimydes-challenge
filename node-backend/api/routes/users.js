var express = require("express");
const {
  createUser,
  listUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { validateUserInputs, checkIfUserExist } = require("../middlewares/user");
var router = express.Router();

/* users routes. */
router.get("/", listUsers);
router.post("/", validateUserInputs, checkIfUserExist, createUser);
router.put("/:user_id", validateUserInputs, updateUser);
router.delete("/:user_id", deleteUser);

module.exports = router;
