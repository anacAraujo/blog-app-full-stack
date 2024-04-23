import Joi from "joi";

const id = Joi.number().integer().positive().required();
//TODO end with .jpg, .jpeg, .png
const img = Joi.string();
const video = Joi.string();
const title = Joi.string().min(3).max(30).required();
const desc = Joi.string().min(3).required();

const cat = Joi.string().valid(
  "art",
  "food",
  "science",
  "technology",
  "cinema",
  "design"
);

export const idSchema = Joi.object({
  id: id,
});

export const getPostsSchema = Joi.object({
  cat: cat.optional(),
});

export const addPostSchema = Joi.object({
  title: title,
  desc: desc,
  img: img.required(),
  video: video,
  cat: cat.required(),
});

export const updatePostSchema = Joi.object({
  id: id,
  title: title,
  desc: desc,
  img: img.allow(""),
  video: video,
  cat: cat.required(),
});
