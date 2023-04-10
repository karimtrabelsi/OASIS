const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const localIpAddress = require("local-ip-address");
module.exports = async (req, res) => {
  const userLogginIn = req.body;
  console.log(localIpAddress());
  const ip = localIpAddress();
  User.findOne({ username: userLogginIn.username }).then((dbUser) => {
    console.log(dbUser);
    if (!dbUser) {
      res.status(400).send("User not found");
    } else if (!dbUser.approved) {
      res
        .status(400)
        .send(
          "User is not approved,please wait for an admin to approve your account"
        );
    } else if (dbUser.banned) {
      res.status(400).send("User is banned");
    } else if (!dbUser.ip.includes(ip)) {
      res.status(400).send({
        msg: "User is not allowed to login from this IP",
        number: dbUser.phonenumber,
      });
    } else
      bcrypt
        .compare(userLogginIn.password, dbUser.password)
        .then((isCorrect) => {
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
                res
                  .status(200)
                  .send({
                    token: "Bearer " + token,
                    user: JSON.stringify(dbUser),
                  });
              }
            );
          } else {
            res.status(400).send("Invalid Username or Password");
          }
        });
  });
};
