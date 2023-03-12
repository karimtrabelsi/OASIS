const User = require("../../models/user");
const bcrypt = require("bcrypt");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });
module.exports = upload;

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
      phonenumber: user.phonenumber,
      email: user.email,
      password: user.password,
      club: user.club,
      role: user.role,
      image: req.file.filename,
      ip: user.ip,
    });
    dbUser.save();
    res.status(200).send("User created");
  }
};
