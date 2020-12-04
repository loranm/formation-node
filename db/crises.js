const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");

const crisisBlueprint = {
  name: { type: String },
  heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: "heroes" }],
};

const crisisSchema = new mongoose.Schema(crisisBlueprint);
const CrisisModel = mongoose.model("crises", crisisSchema);

module.exports = {
  getCrises: () =>
    CrisisModel.find().populate("heroes", "name -_id").sort("name"),
  saveNewCrisis: (crisis) => {
    const newCrisis = new CrisisModel(crisis);
    return newCrisis.save();
  },
};
