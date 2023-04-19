const mongoose = require("mongoose");
const User = require("./user");
const Election = require("./election");

const Position = {
    President: "President",
    Secretary: "Secretary",
    Treasurer: "Treasurer",
    Protocol: "Protocol",
    VicePresident: "Vice-President",
    PublicInterestChief : "Public Interest Chief", 
    InternationalServiceChief :"International Service Chief",
    InteriorServiceChief: "Interior Service Chief",
    PersonalDevelopmentManager: "Personal Development Manager",
    HumanResourcesChief: "Human Resources Chief",
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
