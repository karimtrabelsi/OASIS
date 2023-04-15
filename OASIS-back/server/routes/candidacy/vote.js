const Candidacy = require("../../models/candidacy");

module.exports = async (req, res) => {
    const id = req.params.id;
  
    Candidacy.findByIdAndUpdate(id, { $inc: { vote: 1 } }, { new: true })
      .then((updatedCandidacy) => {
        if (!updatedCandidacy) {
          return res.status(404).send("Candidacy not found");
        }
        res.status(200).json(updatedCandidacy);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Failed to update candidacy");
      });
  };
  