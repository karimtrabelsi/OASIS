const mongoose = require("mongoose");
const Roles = {
  SuperAdmin: "SuperAdmin",
  Governor: "Governor",
  Member: "Member",
  President: "President",
};

const userSchema = new mongoose.Schema(
  {
    _id: Number,
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.Member,
    },
    banned: {
      type: Boolean,
      default: false,
    },
    club: {
      type: String,
      required: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
