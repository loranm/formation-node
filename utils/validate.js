const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const courseSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().min(3).required(),
  author: Joi.string().min(3),
});

const genreSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

const customerSchema = Joi.object({
  id: Joi.objectId(),
  isGold: Joi.boolean(),
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(3).max(50).required(),
});

const movieSchema = Joi.object({
  title: Joi.string().min(5).max(50).required,
  genreId: Joi.objectId().required(),
  numberInStock: Joi.number().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required(),
});

const rentalSchema = Joi.object({
  customerId: Joi.objectId().required(),
  movieId: Joi.objectId().required(),
});

module.exports = {
  validateCourse: (course) => courseSchema.validate(course),
  validateGenre: (genre) => genreSchema.validate(genre),
  validateCustomer: (customer) => customerSchema.validate(customer),
  validateMovie: (movie) => movieSchema.validate(movie),
  validateRental: (rental) => rentalSchema.validate(rental),
};
