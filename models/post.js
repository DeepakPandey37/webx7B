const mongoose = require("mongoose");

const postschema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  summary: {
    type: String,
  },
  tag: {
    type: String,
  },
  url:{
    type:String,
  },
  author: {
    type: String,
  },
}, { timestamps: true });  


const Post = mongoose.model("Post", postschema);


module.exports = Post;
