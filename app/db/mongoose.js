const mongoose = require("mongoose");
const config = require("config");
const { courseCreate, coursesGet } = require("./courses");
const { getAuthors, createAuthor } = require("./author");

const db = config.get("db.uri");

const client = async () => {
  try {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(db, config.get("db.options"));
  } catch (error) {
    console.log(error);
  }
};

const fakeCourse = {
  name: "node course",
  author: "5f291196e554d3e2fe0da159",
  category: "web",
  tags: ["web"],
  isPublished: true,
  price: 20,
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

// const authors = async () => {
//   const authorsList = await getAuthors();
//   console.log("authors -> authorsList", authorsList);
// };

// const newAuthor = async (options) => {
//   const author = createAuthor(options);
//   console.log(author);
// };

// // newAuthor({ name: "loran", bio: "hello world" });
// authors();

module.exports = client;
