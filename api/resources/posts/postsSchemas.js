import Joi from "joi";

export const getPostsSchema = Joi.object({
  cat: Joi.string().valid(
    "art",
    "food",
    "science",
    "technology",
    "cinema",
    "design"
  ),
});
