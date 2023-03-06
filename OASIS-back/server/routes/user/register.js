const User = require("../../models/user");

module.exports = async (req, res) => {
  const user = req.body;
  const takenUsername = await User.findOne({ username: req.body.username });
  const takenEmail = await User.findOne({ email: req.body.email });
  if (takenUsername || takenEmail) {
    res.status(400).send("Username or email already taken");
  } else {
    user.password = await bcrypt.hash(user.password, 10);
    const dbUser = new User({
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      club: user.club,
    });
    dbUser.save();
    res.status(200).send("User created");
  }
};
