const mongoose = require("mongoose");
const { genreSchema } = require("./schemas");

const GenreModel = mongoose.model("genres", genreSchema);

module.exports = {
  getGenres: () => GenreModel.find().sort("name"),
  getGenre: (id) => GenreModel.findById(id),

  addGenre: (options) => {
    const genre = new GenreModel(options);
    return genre.save();
  },
  updateGenre: async (id, options) => {
    try {
      const genre = await GenreModel.findByIdAndUpdate(id, options, {
        new: true,
      });
      return genre;
    } catch (error) {
      console.log(error);
    }
  },
  deleteGenre: async (id) => GenreModel.findByIdAndRemove(id),
};
