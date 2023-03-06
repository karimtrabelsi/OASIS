const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const register = require("./routes/user/register");
const login = require("./routes/user/login");
const getusers = require("./routes/user/getUsers");
const update = require("./routes/user/update");
const ban = require("./routes/user/banUser");
const approve = require("./routes/user/approveUser");

const app = express();
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

app.put("/users/ban/:id", ban);

app.put("/users/approve/:id", approve);
