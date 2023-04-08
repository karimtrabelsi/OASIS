const Club = require("../../models/club");
const User = require("../../models/user");
const express = require("express");
const app = express();
const router = express.Router();

module.exports = router;
const createclub = async (req, res) => {
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
        image: club.image,
      });
      dbClub.save();
      res.status(200).send("Club created");
    }
  };
  router.route("/create").post(createclub);

  const updateclub = async (req, res) => {
    Club.findOne({ _id: req.params.id }).then((club) => {
        // console.log(req.file);
        club.clubname = req.body.clubname;
        club.email = req.body.email;
        club.image= req.body.image;
        club.save();
        res.status(200).send("club updated");
      })
        .catch((err) => {
          console.log(err);
        }
        );
  }
  router.route("/update/:id").put(updateclub);

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

