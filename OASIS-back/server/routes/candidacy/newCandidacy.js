const Candidacy = require("../../models/candidacy");
const User = require("../../models/user");
const Election = require("../../models/election");

module.exports = async (req, res) => {
  try {
    const candidacy = req.body;
    const dbCandidacy = new Candidacy({
      electionSelected: candidacy.electionSelected,
      user: await User.findById(candidacy.user),
      position: candidacy.position,
      description: candidacy.description,
      file: req.file.filename,
      vote: candidacy.vote,
    });
    const election = await Election.findById(candidacy.idElection);
    election.candidates.push(dbCandidacy);
    await election.save();
    const savedCandidacy = await dbCandidacy.save();
    res.status(200).json(savedCandidacy);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Failed to create candidacy");
  }
}
