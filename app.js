const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const app = express();
const dbClient = require("./db/mongoose");
const { getCourses } = require("./db/courses");

dbClient();
const PORT = process.env.PORT || 3000;

// Routes
const courses = require("./routes/courses");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rental = require("./routes/rental");
const users = require("./routes/users");
const authentication = require("./routes/auth");

app.use(express.json());

app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use("/api/courses", courses);
app.use("/api/vidly/genres", genres);
app.use("/api/vidly/customers", customers);
app.use("/api/vidly/movies", movies);
app.use("/api/rental", rental);
app.use("/api/users", users);
app.use("/api/auth", authentication);

app.listen(PORT, (req, res) => {
  morgan("combined");
  console.log(`${config.get("name")} started at PORT:${PORT}`);
});

getCourses();

module.exports = app;
