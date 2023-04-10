const Candidacy = require("../../models/candidacy");
const User = require("../../models/user");
const Election = require("../../models/election");


const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "files");
  },
  filename: function (req, files, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(files.originalname));
  },
});

const fileFilter = (req, files, cb) => {
  const allowedFileTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (allowedFileTypes.includes(files.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });
module.exports = upload;

module.exports = async (req, res) => {
    try {
        const candidacy = req.body;
        const dbCandidacy = new Candidacy({
            user: await User.findById(candidacy.user),
            position: candidacy.position,
            description: candidacy.description,
            file: req.file.filename,
            vote: candidacy.vote,
        });
        const election= await Election.findById(candidacy.idElection);
        election.candidates.push(dbCandidacy);
        await election.save();
        const savedCandidacy = await dbCandidacy.save();
        res.status(200).json(savedCandidacy);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Failed to create candidacy");
    }
}
