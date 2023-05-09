const mongoose = require("mongoose");
const User = require("./user");

const chatSchema = new mongoose.Schema({
    sender: {
        type: User.schema,
        required: true
    },
    receiver: {
        type: User.schema,
        required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  
  const Chat = mongoose.model('Chat', chatSchema);
  module.exports = Chat;