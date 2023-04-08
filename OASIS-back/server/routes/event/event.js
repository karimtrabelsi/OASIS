const Event = require ("../../models/event");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const { eventname, startdate, enddate, place, collaborateur, cotisation, typeEvent, axes } = req.body;

    // Vérifier si un événement avec ce nom et cette date de début existe déjà
    const existingEvent = await Event.findOne({ eventname, startdate });
    if (existingEvent) {
      return res.status(400).send("EventName and Date already taken");
    }

    // Créer le nouvel événement
    const event = await Event.create({
      eventname,
      startdate,
      enddate,
      place,
      collaborateur,
      cotisation,
      typeEvent,
      axes,
    });
   // dbEvent.save();
    res.status(201).json(event).send("event created");
  } catch (error) {
    res.status(500).json(error.message);
  }
  
};
