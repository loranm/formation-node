const mongoose = require("mongoose");
const { heroSchema } = require("./schemas");

const HeroModel = mongoose.model("heroes", heroSchema);

module.exports = {
  getHeroes: () => HeroModel.find().sort("name"),
  findAndUpdateHero: (id, newValues) =>
    HeroModel.findByIdAndUpdate(id, newValues, { new: true }),
};
