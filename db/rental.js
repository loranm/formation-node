const mongoose = require("mongoose");
const { rentalSchema } = require("./schemas");

const RentalModel = new mongoose.model("rentals", rentalSchema);

module.exports = {
  getRental: () => RentalModel.find(),
  postRental: (options) => {
    const newRental = new RentalModel(options);
    return newRental.save();
  },
  putRental: (id, options) =>
    RentalModel.findByIdAndUpdate(id, options, {
      new: true,
    }),
  deleteRental: (id) => RentalModel.findByIdAndRemove(id),
};
