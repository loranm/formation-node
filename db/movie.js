const mongoose = require("mongoose");
const { movieSchema } = require("./schemas");

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = {
  getMovies: () => {
    console.log("geting movies");
    return MovieModel.find().populate("genre", "name -_id");
  },
  addMovie: (options) => {
    const newMovie = new MovieModel(options);
    return newMovie.save();
  },
  getMovieById: (id) =>
    MovieModel.findOne({ _id: id }).populate("genre", "name -_id"),
  updateMovie: (id, options) =>
    MovieModel.findByIdAndUpdate(id, options, { new: true }).populate(
      "genre",
      "name -_id"
    ),
  deleteMovie: (id) => MovieModel.findByIdAndRemove(id),
};
