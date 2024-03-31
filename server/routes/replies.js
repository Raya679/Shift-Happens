const express = require("express");
const auth = require("../middleware/requireAuth");
const {createReply, getPost, likeReply} = require("../controllers/repliesController")
const router = express.Router();

router.post("/create/:id", auth, createReply);

router.get("/:id", getPost);

router.put("/like/:id", auth, likeReply);

module.exports = router;
