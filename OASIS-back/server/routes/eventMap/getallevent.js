const Event = require("../../models/eventt");
const mongoose = require("mongoose");
const uploadMiddleware = require("../../middleware/MulterMiddleware");

module.exports = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
