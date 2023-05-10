const mongoose = require("mongoose");
const User = require("./user");

const commentSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [Number],
    required: false,
  },
  postId: {
    type: Number,
    required: true,
  },
});

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
  likes: {
    type: [Object],
    required: false,
    default: [],
  },
  comments: {
    type: [Object],
    required: false,
    default: [],
  },
  file: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  uuid: {
    type: String,
    required: true,
  },
  user: {
    type: User.schema,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
