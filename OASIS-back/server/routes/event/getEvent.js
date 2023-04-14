const Event = require("../../models/event");

module.exports = async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };