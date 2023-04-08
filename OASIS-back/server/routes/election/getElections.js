const Election = require("../../models/election");

module.exports = (req, res) => {
  Election.find().then((election) => {
    res.status(200).send(election);
  });
};