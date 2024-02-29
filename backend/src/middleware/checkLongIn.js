const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
});

const validateUser = (req, res, next) => {
  const { password, email } = req.body;

  const { error } = userSchema.validate(
    { password, email },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};
module.exports = validateUser;
