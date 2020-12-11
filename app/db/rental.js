const mongoose = require("mongoose");
const { rentalSchema } = require("./schemas");

const RentalModel = new mongoose.model("rentals", rentalSchema);

module.exports = {
  getRental: () => RentalModel.find(),
  postRental: (customer, movie) => {
    const rentalOptions = {
      customer: {
        _id: customer._id,
        phone: customer.phone,
        name: customer.name,
      },
      movie: {
        _id: movie._id,
        dailyRentalRate: movie.dailyRentalRate,
        title: movie.title,
      },
    };
    const newRental = new RentalModel(rentalOptions);
    return newRental.save();
  },
  putRental: (id, options) =>
    RentalModel.findByIdAndUpdate(id, options, {
      new: true,
    }),
  deleteRental: (id) => RentalModel.findByIdAndRemove(id),
};
