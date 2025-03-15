const { Post, validatePost } = require("../models/postModel");
const _ = require("lodash");

const getPosts = async (req, res) => {
  const allPosts = await Post.find().sort({ time: -1 });
  res.status(200).json(allPosts);
};

const getPost = async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.id }).populate(
      "author",
      "name username"
    );
    const views = post[0].views;
    post[0].views = views + 1;
    const result = await post[0].save();
    res.send(post[0]);
  } catch (ex) {
    return res.send(ex.message);
  }
};

const createPost = async (req, res) => {
  const { error } = validatePost(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    author: req.body.username,
    views: 1,
  });
  try {
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.log("error: ", err);
  }
};

const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send("Post doesn't exists");
  //   if (post.author == req.user._id)
  //   return res.status(400).send("You can't upvote your own post");
  const upvoteArray = post.upvotes;
  const index = upvoteArray.indexOf(req.user._id);
  if (index === -1) {
    upvoteArray.push(req.user._id);
  } else {
    upvoteArray.splice(index, 1);
  }
  post.upvotes = upvoteArray;
  const result = await post.save();
  const post_new = await Post.find({ _id: post._id }).populate(
    "author",
    "name username"
  );
  res.status(200).json(post);
};

module.exports = { getPost, getPosts, createPost, likePost };
