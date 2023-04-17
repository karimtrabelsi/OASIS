const Club = require("../../models/club");
const User = require("../../models/user");
const express = require("express");
const app = express();
const router = express.Router();

module.exports = router;

const multer = require("multer");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../OASIS-front/src/images/clubs");
  },
  filename: function (req, file, cb) {
    cb(null, "clubImage-" + req.body.clubname + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });



const createclub = async (req, res) => {
  try {
    const club = req.body;
    const takenclubname = await Club.findOne({ clubname: club.clubname });
    const takenEmail = await Club.findOne({ email: club.email });
  
    if (takenclubname || takenEmail) {
      res.status(400).send("Username or email already taken");
    } 
    else {
       
        const dbClub = new Club({
        clubname: club.clubname,
        foundingpresident: await User.findById(club.fp),
        city: club.city,
        region: club.region,
        email: club.email,
        club: club.club,
        type: club.type,
        image: req.file.filename,
      });
      dbClub.save();
      res.status(200).send("Club created");
    }
  } catch (err) {
    console.log(err);
  }
  };
  router.route("/create").post(upload.single("image"),createclub);

  const updateclub = async (req, res) => {
    Club.findOne({ _id: req.params.id }).then((club) => {
         console.log(req.files);
        club.clubname = req.body.clubname;
        club.email = req.body.email;
        club.image= req.file.filename;
        club.save();
        res.status(200).send("club updated");
      })
        .catch((err) => {
          console.log(err);
        }
        );
  }
  router.route("/update/:id").put(upload.single("image"),updateclub);

  const getClubs = async (req, res) => {
    Club.find().then((clubs) => {
      res.status(200).send(clubs);
    });
  };
  router.route("/getclubs").get(getClubs);


  const getClub = async (req, res) => {
   await  Club.findById( req.params.id ).then((club) => {

        res.status(200).send(club);
    })
  };
  router.route("/getclub/:id").get(getClub);

  const approveClub = async (req, res) => {
   await Club.findOne({ _id: req.params.id }).then((club) => {
        club.approved = true;
        club.save();
        res.status(200).send("Club approved");
      });
  };
  router.route("/approveclub/:id").put(approveClub);
