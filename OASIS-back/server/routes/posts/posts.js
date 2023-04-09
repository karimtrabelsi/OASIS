const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Post = require("../../models/post");
const multer = require("multer");
const fs = require("fs");

let path = require("path");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath =
      "../OASIS-front/src/uploads/posts/user-" +
      req.body.userId +
      "/post-" +
      req.body.uuid;
    console.log(req.body);
    fs.mkdir(dirPath, { recursive: true }, function (err) {
      if (err) {
        cb(err);
      } else {
        cb(null, dirPath);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: fileStorage,
  fileFilter,
});

router.get("/allPosts", (req, res) => {
  Post.find().then((posts) => {
    res.status(200).send(posts);
  });
});

router.get("/myPosts/:userId", (req, res) => {
  Post.find({ userId: req.params.userId }).then((posts) => {
    res.status(200).send(posts);
  });
});

router.post(
  "/addPost",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  (req, res) => {
    const post = new Post({
      userId: req.body.userId,
      content: req.body.content,
      image: req.files["image"] ? req.files["image"][0].originalname : "null",
      file: req.files["file"] ? req.files["file"][0].originalname : "null",
      link: req.body.link !== "" ? req.body.link : "null",
      uuid: req.body.uuid,
    });
    post
      .save()
      .then((post) => {
        res.status(200).send(post);
      })
      .catch((error) => {
        console.log(post);
        res.status(401).send(error);
      });
  }
);

router.post("/addComment", (req, res) => {
  const comment = {
    userId: req.body.userId,
    content: req.body.content,
    postId: req.body.postId,
  };
  post
    .findById(req.body.postId)
    .then((post) => {
      post.comments.push(comment);
      post
        .save()
        .then((post) => {
          res.status(200).send(post);
        })
        .catch((error) => {
          res.status(401).send(error);
        });
    })
    .catch((error) => {
      res.status(401).send(error);
    });
});

module.exports = router;
