const mongoose = require("mongoose");
const TypeEvent = {
  CharityEvent: "CharityEvent",
  TeamBuilding: "TeamBuilding",
  ProTraining: "ProTraining",
};

const Axes = {
    Diabetes: "Diabetes",
    Vision: "Vision",
    Hunger: "Hunger",
    Environment:"Environment",
    ChildhoodCancer:"ChildhoodCancer",
  };

const eventSchema = new mongoose.Schema(
    {
      
      eventname: {
        type: String,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
      startdate: {
        type: Date,
        required: false,
      },
      enddate: {
        type: Date,
        required: false,
      },
      place: {
        type: String,
        required: false,
      },
      collaborateur: {
        type: String,
        required: false,
      },
      cotisation: {
        type: Number,
      },
      typeEvent: {
        type: String,
        enum: Object.values(TypeEvent),
      },
      axes: {
        type: String,
        enum: Object.values(Axes),
      },
      
    },
    { timestamps: true }
  );
  
  const Event = mongoose.model("Event", eventSchema);
  module.exports = Event;
  