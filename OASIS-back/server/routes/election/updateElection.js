const Election = require("../../models/election");

module.exports = (req, res) => {
  const id = req.params.id;
  const update = req.body;

  Election.findByIdAndUpdate(id, update, { new: true })
    .then((updatedElection) => {
      if (!updatedElection) {
        return res.status(404).send("Election not found");
      }
      res.status(200).json(updatedElection);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to update election");
    });
};