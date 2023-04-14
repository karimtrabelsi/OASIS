const mongoose = require("mongoose");
const User = require("./user");
const Type = {
    President: "President",
    Secretary: "Secretary",
    Treasurer: "Treasurer",
    Protocol: "Protocol",
    VicePresident: "Vice-President",
};

const candidacySchema = new mongoose.Schema(
  {
    user: {
        type: User.schema,
        required: true,
    },
    position: {
        type: String,
        enum: Object.values(Type),
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    file: {
        type: String,
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
