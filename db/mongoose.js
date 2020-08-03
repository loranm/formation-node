const mongoose = require("mongoose");
const config = require("config");
const { courseCreate, coursesGet } = require("./courses");

const db = config.get("db.uri");

const client = async () => {
  try {
    await mongoose.connect(db, config.get("db.options"));
  } catch (error) {
    console.log(error);
  }
};

const fakeCourse = {
  name: "node course",
  author: "Mosh",
  category: "web",
  tags: [],
  isPublished: true,
};
// const fakeCourse2 = {
//   name: "Angular course",
//   author: "Mosh",
//   tags: ["angular", "frontend"],
//   isPublished: true,
//   price: 20,
// };

// courseCreate(fakeCourse);
// courseCreate(fakeCourse2);

// coursesCount({ isPublished: true });

// coursesGet();
module.exports = client;
