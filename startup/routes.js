const { json } = require("express");
const cors = require("cors");
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
const register = require("../routes/register");
const heroes = require("../routes/heroes");
const crises = require("../routes/crises");

module.exports = (app) => {
  app.use(cors());
  app.use(json());
  app.use(morgan("tiny"));
  app.use(helmet());
  app.use("/api/courses", courses);
  app.use("/api/genres", genres);
  app.use("/api/vidly/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rental", rental);
  app.use("/api/users", users);
  app.use("/api/register", register);
  app.use("/api/auth", authentication);
  app.use("/api/heroes", heroes);
  app.use("/api/crises", crises);
};
