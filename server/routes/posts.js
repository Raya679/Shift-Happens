const express = require("express");
const router = express.Router();
const {getPost, getPosts, createPost, likePost} = require("../controllers/postController")
const auth = require("../middleware/requireAuth");

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/create", auth, createPost);

router.put("/like/:id", auth, likePost);

module.exports = router;
