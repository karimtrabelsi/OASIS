const mongoose = require("mongoose");
const User = require("./user");
const Election = require("./election");

const Position = {
    President: "President",
    Secretary: "Secretary",
    Treasurer: "Treasurer",
    Protocol: "Protocol",
    VicePresident: "Vice-President",
    ChiefExecutiveOfficer : "ChiefExecutiveOfficer", 
    ChiefOperatingOfficer :"ChiefOperatingOfficer",
    ChiefFinancialOfficer: "ChiefFinancialOfficer",
    ChiefMarketingOfficer: "ChiefMarketingOfficer",
    ChiefTechnologyOfficer: "ChiefTechnologyOfficer",
    ChiefHumanResourcesOfficer: "ChiefHumanResourcesOfficer",
};

const candidacySchema = new mongoose.Schema(
  {
    electionSelected: {
        type: String,
        required: true,
    },
    user: {
        type: User.schema,
        required: true,
    },
    position: {
        type: String,
        enum: Object.values(Position),
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    vote: {
        type: Number,
        default: 0,
    },
   },
  { timestamps: true }
);

const Candidacy = mongoose.model("Candidacy", candidacySchema);
module.exports = Candidacy;
