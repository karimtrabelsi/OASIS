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
  async (req, res) => {
    const post = new Post({
      userId: req.body.userId,
      content: req.body.content,
      image: req.files["image"] ? req.files["image"][0].originalname : "null",
      file: req.files["file"] ? req.files["file"][0].originalname : "null",
      link: req.body.link !== "" ? req.body.link : "null",
      uuid: req.body.uuid,
      user: await User.findById(req.body.userId),
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

router.post("/addComment", async (req, res) => {
  const user = await User.findById(req.body.userId);
  console.log(user.username);
  const randomId = Math.round(Math.random() * 1000000);
  const comment = {
    user: user,
    content: req.body.content,
    postId: req.body.postId,
    uuid: randomId,
    likes: [Object],
  };
  console.log(req.body);
  await Post.findById(req.body.postId)
    .then((post) => {
      post.comments.push(comment);
      post
        .save()
        .then((post) => {
          res.status(200).send(post);
        })
        .catch((error) => {
          console.log("ici");
          res.status(401).send(error);
        });
    })
    .catch((error) => {
      console.log("sss");

      res.status(401).send(error);
    });
});

router.post("/addLike", (req, res) => {
  const like = {
    userId: req.body.userId,
    postId: req.body.postId,
  };
  Post.findById({ _id: req.body.postId })
    .then((post) => {
      if (post.likes.find((l) => l.userId === like.userId)) {
        console.log("like already exists");
        post.likes.pull(like);
      } else {
        console.log("like does not exist");
        post.likes.push(like);
      }
      post.save();
      res.status(200).send(post);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/addLikeComment", async (req, res) => {
  const like = {
    userId: req.body.userId,
    postId: req.body.postId,
    commentId: req.body.commentId,
  };

  Post.findById(like.postId)
    .then((post) => {
      console.log(post._id);
      const comment = post.comments.find((c) => c.uuid == like.commentId);
      if (comment.likes.find((l) => l.userId === like.userId)) {
        console.log("like already exists");
        console.log(comment.likes.indexOf({ like }));
        delete comment.likes[comment.likes.indexOf({ like }) + 1];
        const newLikes = comment.likes.filter((l) => l !== undefined);
        comment.likes = newLikes;
      } else {
        console.log("like does not exist");
        comment.likes.push(like);
        console.log(comment.likes);
      }
      post.comments.pull(comment);

      post.comments.push(comment);
      post.save();
      res.status(200).send("comment liked");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

module.exports = router;
