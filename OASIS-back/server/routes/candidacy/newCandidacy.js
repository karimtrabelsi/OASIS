const Candidacy = require("../../models/candidacy");

module.exports = async (req, res) => {
    try {
        const candidacy = req.body;
        const dbCandidacy = new Candidacy({
            user: candidacy.user,
            position: candidacy.position,
            description: candidacy.description,
            file: candidacy.file,
            vote: candidacy.vote,
        });
        const savedCandidacy = await dbCandidacy.save();
        res.status(200).json(savedCandidacy);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Failed to create candidacy");
    }
}
