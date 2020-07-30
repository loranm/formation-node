const express = require("express");
const router = express.Router();

let courses = [
  { id: 1, title: "node course", author: "cool guy" },
  { id: 2, title: "node course", author: "cool guy2" },
  { id: 3, title: "node course", author: "cool guy3" },
];

const coursesHandler = (req, res) => {
  res.json(courses);
};

const courseHandler = (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  course
    ? res.send(course)
    : res.status(404).send("the course with the given id was not found");
};

const addCourse = (req, res) => {
  const course = {
    id: courses.length + 1,
    title: req.body.title,
    author: "cool guy",
  };
  const { value, error } = validateCourse(course);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  courses.push(value);
  res.send(course);
};

const updateCourse = (req, res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));

  if (!course) {
    res.status(400).send("this course cannot be found");
    return;
  }

  course = {
    ...course,
    title: req.body.title || course.title,
    author: req.body.author || course.author,
  };

  const { value, error } = validateCourse(course);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  updateCourses(value);

  res.send(value);
};

router.get("/", coursesHandler);
router.get("/:id", courseHandler);
router.post("/", addCourse);
router.put("/:id", updateCourse);

module.exports = router;
