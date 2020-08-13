const { json } = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// Routes
const courses = require("../routes/courses");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rental = require("../routes/rental");
const users = require("../routes/users");
const authentication = require("../routes/auth");

module.exports = (app) => {
  app.use(json());
  app.use(morgan("tiny"));
  app.use(helmet());
  app.use("/api/courses", courses);
  app.use("/api/genres", genres);
  app.use("/api/vidly/customers", customers);
  app.use("/api/vidly/movies", movies);
  app.use("/api/rental", rental);
  app.use("/api/users", users);
  app.use("/api/auth", authentication);
};
