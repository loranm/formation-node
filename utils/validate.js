const Joi = require("@hapi/joi");

const courseSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().min(3).required(),
  author: Joi.string().min(3),
});

const genreSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

const customerSchema = Joi.object({
  isGold: Joi.boolean(),
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(3).max(50).required(),
});

module.exports = {
  validateCourse: (course) => courseSchema.validate(course),
  validateGenre: (genre) => genreSchema.validate(genre),
  validateCustomer: (customer) => customerSchema.validate(customer),
};
