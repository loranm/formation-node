const express = require("express");
const router = express.Router();
const {
  getMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../db/movie");

router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.put("/:id", changeMovie);
router.delete("/:id", removeMovie);

async function getAllMovies(req, res) {
  const movies = await getMovies();
  res.json(movies);
}

async function getMovie(req, res) {
  const movie = await getMovieById(req.params.id);
  res.json(movie);
}

async function createMovie(req, res) {
  const newMovie = await addMovie(req.body);
  res.json(newMovie);
}

async function changeMovie(req, res) {
  const updatedMovie = await updateMovie(req.params.id, req.body);
  res.send(updatedMovie);
}

async function removeMovie(req, res) {
  const deletedMovie = await deleteMovie(req.params.id);
  res.json(deletedMovie);
}

module.exports = router;
