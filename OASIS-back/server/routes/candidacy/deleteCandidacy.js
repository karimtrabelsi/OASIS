const Candidacy = require("../../models/candidacy");
const Election = require("../../models/election");

module.exports = async (req, res) => {
    try {
      const candidacy = await Candidacy.findByIdAndDelete(req.params.id);
      if (!candidacy) {
        return res.status(404).send("Candidacy not found");
      }
  
      const election = await Election.findById(candidacy.electionSelected);
      election.candidates = election.candidates.filter(
        (candidate) => candidate._id.toString() !== candidacy._id.toString()
      );
      await election.save();
  
      res.status(200).json(candidacy);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to delete candidacy");
    }
  };  
  
  
  
  
  
