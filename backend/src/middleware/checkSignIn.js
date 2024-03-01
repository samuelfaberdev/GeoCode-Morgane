/* eslint-disable camelcase */
const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  nom: Joi.string()
    .max(255)
    .pattern(/^[a-zA-Z]{3,255}$/)
    .required(),
  prenom: Joi.string()
    .max(255)
    .pattern(/^[a-zA-Z]{3,255}$/)
    .required(),
  anniversaire: Joi.string()
    .max(255)
    .pattern(/([0-9]{4})([/-])([0-9]{2})\2([0-9]{2})$/)
    .required(),
  rue: Joi.string()
    .max(255)
    .pattern(/^[a-zA-Z0-9]{3,255}$/)
    .required(),
  code_postal: Joi.number().integer(),
  ville: Joi.string()
    .max(255)
    .pattern(/^[a-zA-Z]{3,255}$/)
    .required(),
  connexion: Joi.string()
    .max(255)
    .pattern(/([0-9]{4})([/-])([0-9]{2})\2([0-9]{2})$/)
    .required(),
  nb_vehicule: Joi.number().integer(),
  admin: Joi.bool().required,
  inscription: Joi.string()
    .max(255)
    .pattern(/([0-9]{4})([/-])([0-9]{2})\2([0-9]{2})$/)
    .required(),
  derniere_maj: Joi.string()
    .max(255)
    .pattern(/([0-9]{4})([/-])([0-9]{2})\2([0-9]{2})$/)
    .required(),
});

const validateUser = (req, res, next) => {
  const {
    password,
    email,
    nom,
    prenom,
    anniversaire,
    rue,
    ville,
    code_postal,
    connexion,
    nb_vehicule,
    inscription,
    derniere_maj,
    admin,
  } = req.body;

  const { error } = userSchema.validate(
    {
      password,
      email,
      nom,
      prenom,
      anniversaire,
      rue,
      ville,
      code_postal,
      connexion,
      nb_vehicule,
      inscription,
      derniere_maj,
      admin,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(200).send({ message: `${error}` });
  } else {
    next();
  }
};
module.exports = validateUser;
