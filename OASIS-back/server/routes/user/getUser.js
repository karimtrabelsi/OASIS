const mongoose = require('mongoose');
const User = require('../../models/user'); // assuming you have defined a User model

module.exports = (req, res) => {

// Assuming you have a user ID:
User.findOne({ _id: req.params.id }).then((user) => {

res.status(200).send(user);
})
}