const Candidacy = require("../../models/candidacy");
const Election = require("../../models/election");

module.exports = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    Candidacy.findByIdAndUpdate(id, update, { new: true })
    .then((updateCandidacy) => {
        if (!updateCandidacy) {
            return res.status(404).send("Candidacy not found");
        }
        
        res.status(200).json(updateCandidacy);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Failed to update candidacy");
    }
    );
};

    