const mongoose = require("mongoose");

const categories = ["web", "mobile", "network"];

const tagValidator = {
  validator: (v) => Promise.resolve(Boolean(v) && v.length > 0),
  message: "course should have at least on tag",
};

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  category: { type: String, enum: categories },
  author: String,
  tags: {
    type: Array,
    validate: tagValidator,
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
});

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean },
  name: { type: String },
  phone: { type: String },
});

module.exports = {
  courseSchema,
  genreSchema,
  customerSchema,
};
