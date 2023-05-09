const Candidacy = require("../../models/candidacy");
const Vote = require("../../models/vote");
const User = require("../../models/user");
const Election = require("../../models/election");
const { spawn } = require('child_process');

module.exports = async (req, res) => {
  try {
    // Check if the user has already voted for this position
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const existingVote = await Vote.findOne({
      position: req.body.position,
      user: user._id,
    });

    if (existingVote) {
      return res.status(409).json({ message: 'You have already voted for this position.' });
    }
 
     const election = await Election.findById(req.body.electionSelected);
     const currentDate = new Date();
     if (currentDate < election.startDate || currentDate > election.endDate) {
       return res.status(400).json({ message: 'Election is not active.' });
     }

    // Call the face recognition script
    const pythonProcess = spawn(process.env.PYTHON_PATH, ['server/server.py']);
    const timeout = setTimeout(() => {
      pythonProcess.kill();
      res.status(401).json({ message: 'Unauthorized. Face recognition timeout.' });
    }, 20000);
    

    pythonProcess.stdout.on('data', async (data) => {
      clearTimeout(timeout);
      const returnedUserId = data.toString().trim();

      // Check if the returned user ID is the same as the ID of the user who is voting
      if (returnedUserId == user._id ) {
        // Create a new vote object
        const vote = new Vote({
          position: req.body.position,
          user: req.body.user,
        });

        // Save the vote to the database
        const candidacie = await Candidacy.findById(req.body.candidacies)
        await vote.candidacies.push(candidacie)
        await vote.save();

        // Increment the vote count for the candidacies
        const updatedCandidacy = await Candidacy.findOneAndUpdate(
          { _id: vote.candidacies },
          { $inc: { vote: 1 } },
          { new: true }
        );

        // Send a success response
        res.status(201).json({ message: 'Vote submitted successfully.' });
      } else {
        // Send an error response if the returned user ID is not the same as the ID of the user who is voting
        res.status(401).json({ message: 'Unauthorized. Face does not match user.' });
      }
    });

  } catch (err) {
    // Send an error response
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
