const mongoose = require("mongoose");
const { customerSchema } = require("./schemas");

const CustomerModel = mongoose.model("customers", customerSchema);

module.exports = {
  getCustomers: () => CustomerModel.find().sort("name"),
  addCustomer: (options) => {
    const newCustomer = new CustomerModel(options);
    return newCustomer.save();
  },
  updateCustomer: (id, newValues) =>
    CustomerModel.findByIdAndUpdate(id, newValues, { new: true }),
  deleteCustomer: (id) => CustomerModel.findByIdAndDelete(id),
};
