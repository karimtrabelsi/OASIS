const Candidacy = require("../../models/candidacy");


module.exports = (req, res) => {
    Candidacy.findByIdAndDelete(req.params.id)
    .then((candidacy) => {
        if (!candidacy) {
            return res.status(404).send("Candidacy not found");
        }
        res.status(200).json(candidacy);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Failed to delete candidacy");
    }
    );
}
