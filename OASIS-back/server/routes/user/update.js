const User = require("../../models/user");

module.exports = (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.phonenumber = req.body.phonenumber;
    user.email = req.body.email;
    user.save();
    res.status(200).send("User updated");
  });
};
