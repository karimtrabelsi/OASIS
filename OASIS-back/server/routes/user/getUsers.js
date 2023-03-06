const User = require("../../models/user");

module.exports = (req, res) => {
  User.find().then((users) => {
    res.status(200).send(users);
  });
};
