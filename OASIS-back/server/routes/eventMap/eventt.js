const Event = require("../../models/eventt");
const mongoose = require("mongoose");
const uploadMiddleware = require("../../middleware/MulterMiddleware");

module.exports = async (req, res) => {
  uploadMiddleware.single("photo")(req, res, async (err) => {
    const { title, description, price, latitude, longitude } = req.body;
    let budget = price;

    try {
      const event = new Event({
        title: title,
        description: description,
        photo: req.file.filename,
        budget: budget,
        latitude: latitude,
        longitude: longitude,
      });

      const savedEvent = await event.save();
      res.status(200).send(savedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
};
