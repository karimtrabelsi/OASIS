const Candidacy = require("../../models/candidacy");
const Election = require("../../models/election");

module.exports = (req, res) => {
    Candidacy.findOne({ _id: req.params.id }).then((candidacy) => {
      candidacy.position = req.body.position;
      candidacy.description = req.body.description;
      if (req.file) {
        candidacy.file = req.file.filename;
      }  
      candidacy.save();
      res.status(200).send("Candidacy updated");
    })
      .catch((err) => {
        console.log(err);
      }
      );
  };
    