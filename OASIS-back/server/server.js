const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const register = require("./routes/user/register");
const login = require("./routes/user/login");
const getusers = require("./routes/user/getUsers");
const update = require("./routes/user/update");
const ban = require("./routes/user/banUser");
const approve = require("./routes/user/approveUser");
const passwordReset = require("./routes/user/resetPassword");
const twoFactorAuth = require("./routes/user/twoFactorAuth");
const verifyJWt = require("./middleware/verifyJWT");

const app = express();
app.use(cors());
require("dotenv").config();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(process.env.APP_PORT, () => {
      console.log(`Server running on port ${process.env.APP_PORT}`);
    });
  })
  .catch((err) => console.log(err));
app.post("/register", register);

app.post("/login", login);

app.get("/users", getusers);

app.put("/users/:id", update);

app.post("/users/ban/:id", ban);

app.post("/users/approve/:id", approve);

app.use("/users/password-reset", passwordReset);

app.use("/users/twoFactorAuth", twoFactorAuth);

app.get("/getUsername", verifyJWt, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});
