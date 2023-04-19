const Candidacy = require("../../models/candidacy");
const User = require("../../models/user");
const Election = require("../../models/election");

module.exports = (req, res) => {
    const userId = req.params.userId;
    const electionId = req.params.electionId;
  
    Election.findById(electionId)
  .then((election) => {
    if (!election) {
      res.status(404).send('Election not found');
    } else {
      const userExists = election.candidates.some(candidate  => candidate.user._id.toString() === userId);
      if (userExists) {
        // user exists in the list of users for this election
        res.status(200).send(`User ${userId} exists in the list of users for election ${electionId}`);
      } else {
        // user does not exist in the list of users for this election
        res.status(202).send(`User ${userId} does not exist in the list of users for election ${electionId}`);
      }
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Internal server error');
  });
}