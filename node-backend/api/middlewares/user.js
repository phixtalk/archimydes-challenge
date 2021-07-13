const { findOneUser } = require("../../data-access/user");
const { response } = require("./utils/response");
const { createUserValidation } = require("./validators/user");

const validateUserInputs = async (req, res, next) => {
  //Validate user input data
  const { error } = createUserValidation(req.body);
  if (error) return res.status(400).send(response(error.details[0].message));

  //pass control to next middleware if any
  next();
};

const checkIfUserExist = async (req, res, next) => {
  //Check if user email is already in database
  const emailExist = await findOneUser({ email: req.body.email });
  if (emailExist) return res.status(400).send(response("Email already exist"));

  //pass control to next middleware if any
  next();
};

module.exports = {
  validateUserInputs,
  checkIfUserExist,
};
