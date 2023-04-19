const mongoose = require('mongoose');
const Election = require('../../models/election'); 

module.exports = (req, res) => {

Election.findOne({ _id: req.params.id }).then((election) => {

res.status(200).send(election);
})
}