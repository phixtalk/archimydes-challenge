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
/**
 * @swagger
 * /user:
 *    get:
 *      description: Returns all users
 *      responses:
 *        '200':
 *          description: Successfully returned all user
 *        '500':
 *          description: Failed to query for users
 *    put:
 *      description: Use to insert a new user
 *    parameters:
 *      - name: firstName
 *        in: body
 *        description: Firstname of the user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: lastName
 *        in: body
 *        description: lastName of the user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully inserted a user
 *      '500':
 *        description: Failed to insert a user
 */
router.get("/", listUsers);
router.post("/", validateUserInputs, checkIfUserExist, createUser);
router.put("/:user_id", validateUserInputs, updateUser);
router.delete("/:user_id", deleteUser);

module.exports = router;
