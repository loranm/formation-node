const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const app = express();

const courses = require("./routes/courses");

app.use(express.json());
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use("/api/courses", courses);
const PORT = process.env.PORT || 3000;

function authenticating(req, res, next) {
  console.log(req.body);

  console.log("authenticating");

  next();
}

app.listen(PORT, (req, res) => {
  morgan("combined");
  console.log(`${config.get("name")} started at PORT:${PORT}`);
});
