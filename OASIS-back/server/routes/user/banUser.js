const User = require("../../models/user");
var cors = require('cors');

module.exports = (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    user.banned = !user.banned;
    user.save();
    res.status(200).send("User banned");
  });
};
