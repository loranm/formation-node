const mongoose = require("mongoose");
const { authorSchema } = require("./schemas");

const AuthorModel = mongoose.model("authors", authorSchema);

module.exports = {
  getAuthors: () => AuthorModel.find({}),
  createAuthor: (options) => {
    try {
      const newAuthor = new AuthorModel(options);
      newAuthor.save();
    } catch (error) {}
  },
};
