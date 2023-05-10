const User = require("../../models/user");

module.exports = (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    // console.log(req.file);
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.phonenumber = req.body.phonenumber;
    user.email = req.body.email;
    user.club = req.body.club;  
    user.username = req.body.username;
    user.image= req.file.filename;
    user.save();
    res.status(200).send("User updated");
  })
    .catch((err) => {
      console.log(err);
    }
    );
};
