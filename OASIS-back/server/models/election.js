const mongoose = require("mongoose");
const User = require("./user");
const Candidacy = require("./candidacy");
const Club = require("./club");

const Type = {
  ExecutiveBoard: "ExecutiveBoard",
  ExpandedBoard: "ExpandedBoard",
};

const electionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    club: {
      type: Club.schema,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(Type),
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {  
        type: Date,
        required: true,
    },
    candidates: {   
        type: [Candidacy.schema],
    },
   },
  { timestamps: true }
);

const Election = mongoose.model("Election", electionSchema);
module.exports = Election;
