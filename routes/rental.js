const express = require("express");
const router = express.Router();
const {
  getRental,
  postRental,
  putRental,
  deleteRental,
} = require("../db/rental");

const { getCustomer } = require("../db/customers");
const { getMovieById } = require("../db/movie");
const { validateRental } = require("../utils/validate");

const handleError = (error) => res.status(400).send(error.message);

const rental = async (req, res) => {
  try {
    res.send(await getRental());
  } catch (error) {
    handleError;
  }
};

const addRental = async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await getCustomer(req.body.customerId);
  if (!customer) return res.status(404).send("invalid customer id");

  const movie = await getMovieById(req.body.movieId);
  if (!movie) return res.status(404).send("invalid customer id");

  if (movie.numberInStock === 0)
    return res.status(400).send("movie not available");

  try {
    const newMovie = await postRental(customer, movie);
    res.send(newMovie);
  } catch (error) {
    res.send(error);
  }
};

const changeRental = async (req, res) => {
  try {
    res.send(await putRental(req.params.id, req.body));
  } catch (error) {
    console.log(error);
  }
};

const removeRental = async (req, res) => {
  try {
    res.send(await deleteRental(req.params.id));
  } catch (error) {
    console.log(error);
  }
};

router.get("/", rental);
router.post("/", addRental);
router.put("/:id", changeRental);
router.delete("/:id", removeRental);

module.exports = router;
