const mongoose = require("mongoose");

const EventtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 5000,
  },
  photo: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true, // Make sure that each email is unique
  },

  budget: {
    type: Number,
    default: null,
  },

  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
  created_at: { type: Date, default: Date.now },
});

const Eventt = mongoose.model("Eventt", EventtSchema);

module.exports = Eventt;
