const mongoose = require("mongoose");



const notificationSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
    description: {
      type: String,
      required: false,
    },
    read: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
