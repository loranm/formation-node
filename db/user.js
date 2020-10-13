const mongoose = require("mongoose");
const { userSchema } = require("./schemas");

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  findUsers: () => UserModel.find().sort("name"),
  findUserById: (id) => UserModel.findById(id),
  findUserByEmail: (email) => {
    return UserModel.findOne({ email });
  },
  saveUser: (options) => {
    const user = new UserModel(options);
    user.save();
    return user;
  },
  updateUser: (id, options) =>
    UserModel.findByIdAndUpdate(id, options, {
      new: true,
    }),

  removeUser: (id) => UserModel.findByIdAndRemove(id),
};
