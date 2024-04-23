import Joi from "joi";

const email = Joi.string().email().required();
const username = Joi.string().min(3).required();
const password = Joi.string().min(4).required();

export const registerSchema = Joi.object({
  email: email,
  username: username,
  password: password,
});

export const loginSchema = Joi.object({
  username: username,
  password: password,
});
