const mongoose = require("mongoose");
const { courseSchema } = require("./schemas");

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = {
  courseCreate: async (courseObject) => {
    const course = new CourseModel(courseObject);
    try {
      const result = await course.save();
    } catch (error) {
      console.log("createCourse -> error", error.message);
    }
  },

  getCourses: async (options = {}) => {
    try {
      const courses = await CourseModel.find(options)
        .populate("author", "name -_id")
        // starts with
        // .find({ author: /^pattern/i })
        // ends with
        // .find({ author: /pattern$/i })
        // contains
        // .find({ author: /.*pattern.*/i })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1, author: 1 });
    } catch (error) {
      console.error(error);
    }
  },

  deleteCourse: async (id) => {
    const course = await CourseModel.findByIdAndRemove(id);
  },

  countCourses: async (options) => {
    try {
      const courses = await CourseModel.countDocuments();
    } catch (error) {
      console.error(error);
    }
  },
};
