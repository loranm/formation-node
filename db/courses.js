const mongoose = require("mongoose");
const { courseSchema } = require("./schemas");

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = {
  courseCreate: async (courseObject) => {
    const course = new CourseModel(courseObject);
    try {
      const result = await course.save();

      console.log("createCourse -> result", result);
    } catch (error) {
      console.log("createCourse -> error", error.message);
    }
  },

  coursesGet: async (options = {}) => {
    console.log(options);
    try {
      const courses = await CourseModel.find(options)
        // starts with
        // .find({ author: /^pattern/i })
        // ends with
        // .find({ author: /pattern$/i })
        // contains
        // .find({ author: /.*pattern.*/i })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1 });
    } catch (error) {
      console.error(error);
    }
  },

  courseDelete: async (id) => {
    const course = await CourseModel.findByIdAndRemove(id);
    console.log(course);
  },

  coursesCount: async (options) => {
    try {
      const courses = await CourseModel.countDocuments();
    } catch (error) {
      console.error(error);
    }
  },
};