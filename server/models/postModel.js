const mongoose = require("mongoose");
const { User } = require("./userModel");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 80,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 1,
    min: 1,
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  console.log(post.title)
  const schema = Joi.object({
    title: Joi.string().required().min(10).max(80),
    description: Joi.string().required().min(3).max(1024),
  })
  return schema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;
