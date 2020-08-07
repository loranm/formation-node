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
  author: { type: mongoose.Schema.Types.ObjectId, ref: "authors" },
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

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  bio: {
    type: String,
    minlength: 3,
  },
  website: {
    type: String,
    minlength: 3,
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

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "genres",
  },
  numberInStock: { type: Number, default: 0 },
  dailyRentalRate: {
    type: Number,
    default: 0,
  },
});

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: { type: Number, min: 0 },
});

module.exports = {
  courseSchema,
  authorSchema,
  genreSchema,
  customerSchema,
  movieSchema,
  rentalSchema,
};
