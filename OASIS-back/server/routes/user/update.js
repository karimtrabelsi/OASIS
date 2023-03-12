const User = require("../../models/user");

module.exports = (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    console.log(user);
    user.firstname = req.body.formUser.firstname;
    user.lastname = req.body.formUser.lastname;
    user.phonenumber = req.body.formUser.phonenumber;
    user.email = req.body.formUser.email;
    user.club = req.body.formUser.club;
    user.username = req.body.formUser.username;
    user.save();
    res.status(200).send("User updated");
  })
    .catch((err) => {
      console.log(err);
    }
    );
};
