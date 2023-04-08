const Election = require("../../models/election");


module.exports = (req, res) => {
    const id = req.params.id;
    Election.findByIdAndDelete(id)
      .then((deletedElection) => {
        if (!deletedElection) {
          return res.status(404).send("Election not found");
        }
        res.status(200).json(deletedElection);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Failed to delete election");
      });
  };