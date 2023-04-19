const mongoose = require("mongoose");
const User = require("./user");
const Type = {
  Rotary: "Rotary",
  Rotaract: "Rotaract",
  Interact: "Interact",
  Lions: "Lions",
  Leo: "Leo",
};


const clubSchema = new mongoose.Schema(
  {
    clubname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    foundingpresident: {
      type: User.schema,
      required: true,
    },
    board: {
      type: [User.schema],
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    members: {
      type: [User.schema],
      required: false,
    },
    membersN: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    club: {
      type: String,
      required: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: Object.values(Type),
    },

  },
  { timestamps: true }
);

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
