const Joi = require("joi");

module.exports.userSchema = Joi.object({
  firstname: Joi.string().required().max(25),
  lastname: Joi.string().required().max(25),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  occupation: Joi.string().required().min(1).max(25),
  contact: Joi.string().required().min(1).max(25),
});
