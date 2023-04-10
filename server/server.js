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
const getUser = require("./routes/user/getUser");
const newElection = require("./routes/election/newElection");
const deleteElection = require("./routes/election/deleteElection");
const updateElection = require("./routes/election/updateElection");
const getElections = require("./routes/election/getElections");
const createRecrutement = require("./routes/recrutement/createRecrutement");
const getRecrutements = require("./routes/recrutement/getRecrutements");
const getRecrutement = require("./routes/recrutement/getRecrutement");
const updateRecrutement = require("./routes/recrutement/updateRecrutement");
const deleteRecrutement = require("./routes/recrutement/deleteRecrutement");
const creatEvent = require ("./routes/event/event");
const updatedEvent = require("./routes/event/updateEvent");
const deletEvent = require("./routes/event/deleteEvent");
const getEvent = require("./routes/event/getEvent");
const financialManagement = require("./routes/event/financialManagement");
const app = express();
const club = require("./routes/club/club");

app.use(cors());
require("dotenv").config();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

const { NlpManager } = require("node-nlp");
console.log("Starting Chatbot ...");
const manager = new NlpManager({ languages: ["en"] });
manager.load();
app.use(express.json());
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const response = await manager.process('en', message);
  res.json({ message: response.answer });
});

app.listen(3002, () => {
  console.log('Chatbot API is running on port 3002');
});

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

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const updateEvent = require("./routes/event/updateEvent");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../OASIS-front/src/images/users");
  },
  filename: function (req, file, cb) {
    cb(null, "userImage-" + req.body._id + path.extname(file.originalname));
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

app.post('/recrutements', createRecrutement);
app.get('/recrutements', getRecrutements);
app.get('/recrutements/:id', getRecrutement);
app.put('/recrutements/:id', updateRecrutement);
app.delete('/recrutements/:id', deleteRecrutement);

app.post("/register", upload.single("image"), register);

app.post("/login", login);

app.get("/users", getusers);

app.post("/users/:id", upload.single("image"), update);

app.post("/users/ban/:id", ban);

app.post("/users/approve/:id", approve);

app.use("/password-reset", passwordReset);

app.use("/users/twoFactorAuth", twoFactorAuth);
 
app.use("/clubs", club);

app.use("/election/newElection", newElection);

app.delete("/election/deleteElection/:id", deleteElection);

app.put("/election/updateElection/:id", updateElection);

app.get("/election", getElections);

app.get("/getUsername", verifyJWt, (req, res) => {
  console.log(req.user);
  res.status(200).send({ isLoggedIn: true, username: req.user.username });
});

app.get("/users/:id", getUser);

app.post("/event", creatEvent);
app.put("/updateEvent/:id", updatedEvent);
app.delete("/deletEvent/:id", deletEvent);
app.get("/getEvent",getEvent);
app.post("/predictBudget",  (req, res) => {
  financialManagement
}); 