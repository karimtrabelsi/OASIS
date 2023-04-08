const Event = require("../../models/event");

module.exports = (req, res) => {
  const id = req.params.id;
  const update = req.body;

  Event.findByIdAndUpdate(id, update, { new: true })
    .then((updatedEvent) => {
      if (!updatedEvent) {
        return res.status(404).send("Event not found");
      }
      res.status(200).json(updatedEvent);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to update Event");
    });
};