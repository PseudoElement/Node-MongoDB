const mongooose = require("mongoose");
const Schema = mongooose.Schema;
const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: { type: String, default: new Date().toLocaleDateString().toString() },
  time: { type: String, default: new Date().toLocaleTimeString().toString() },
}); // add time and date
const Post = mongooose.model("Post", postSchema);
module.exports = {
  post: Post,
};
