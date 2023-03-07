const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

module.exports = async (req, res) => {
  const userLogginIn = req.body;
  User.findOne({ username: userLogginIn.username }).then((dbUser) => {
    if (!dbUser) {
      res.status(400).send("User not found");
    }

    if (dbUser.approved === false) {
      res
        .status(400)
        .send(
          "User is not approved,please wait for an admin to approve your account"
        );
    }
    bcrypt.compare(userLogginIn.password, dbUser.password).then((isCorrect) => {
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              res.status(500).send("Error signing token");
            }
            res.status(200).send({ token: "Bearer " + token });
          }
        );
      } else {
        res.status(400).send("Invalid Username or Password");
      }
    });
  });
};
