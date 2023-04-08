const Event = require("../../models/event");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifier si l'événement existe
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    // Supprimer l'événement
    await event.deleteOne();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

