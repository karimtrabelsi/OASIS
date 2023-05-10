const Candidacy = require("../../models/candidacy");

module.exports = (req, res) => {
    Candidacy.find().then((candidacy) => {
        res.status(200).send(candidacy);
    });
    };
    
