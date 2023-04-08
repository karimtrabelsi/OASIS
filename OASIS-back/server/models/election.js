const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    StartDate: {
        type: Date,
        required: true,
    },
    EndDate: {  
        type: Date,
        required: true,
    },
    candidates: {   
        type: [String],
        required: true,
    },
   },
  { timestamps: true }
);

const Election = mongoose.model("Election", electionSchema);
module.exports = Election;
