//Validation
const Joi = require("joi");

const createUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    role: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

module.exports.createUserValidation = createUserValidation;
