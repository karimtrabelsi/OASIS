const User = require("../../models/user");
module.exports = (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    user.approved = true;
    user.save();
    res.status(200).send("User approved");
  });
};
