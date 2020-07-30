const Joi = require("@hapi/joi");

const courseSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().min(3).required(),
  author: Joi.string().min(3),
});

function validateCourse(course) {
  return courseSchema.validate(course);
}

module.exports = validateCourse;
