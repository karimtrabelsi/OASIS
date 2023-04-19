const Election = require("../../models/election");
const Club = require("../../models/club");

module.exports = async (req, res) => {
  try {
    const election = req.body;
    const dbElection = new Election({
      name: election.name,
      club: await Club.findById(election.club),
      type: election.type,
      description: election.description,
      startDate: election.startDate,
      endDate: election.endDate,
      candidates: election.candidates,
    });
    const savedElection = await dbElection.save();
    res.status(200).json(savedElection);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create election");
  }
};





