const Event = require ("../../models/event");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
    const { eventname, startdate, enddate, place, collaborateur, cotisation, typeEvent, axes } = req.body;
    console.log("start")
    console.log(req.body)
    console.log(req.file)
    console.log(req.files)
    console.log("end")


    // Vérifier si un événement avec ce nom et cette date de début existe déjà
    // const existingEvent = await Event.findOne({ eventname, startdate });
    // if (existingEvent) {
    //   return res.status(400).send("EventName and Date already taken");
    // }
    try {
    // Créer le nouvel événement
    const event = await Event.create({
      image: req.file.filename,
      eventname,
      startdate,
      enddate,
      place,
      collaborateur,
      cotisation,
      typeEvent,
      axes,
    });
  await event.save();
    res.status(201).json(event).send("event created");
  } catch (error) {
    console.log(error);
  }
  
};
