const postModule = require("../models/post.js");
function handleError(res, e) {
  res.status(500).send(e);
}
function sendDataFromDB(req, res) {
  postModule.post
    .find()
    .then((posts) => res.status(200).json(posts)) //Send data to api in json-format
    .catch((e) => handleError(res, e));
}
function savePostInDB(req, res) {
  const { text, author, time, date } = req.body;
  const post = new postModule.post({ author, text, time, date });
  post
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => handleError(res, e));
}
function deletePost(req, res) {
  postModule.post
    .findByIdAndDelete(req.body.id)
    .then(() => res.status(200).json(req.body.id))
    .catch((e) => handleError(res, e));
}
module.exports = {
  sendDataFromDB: function (req, res) {
    sendDataFromDB(req, res);
  },
  savePostInDB: function (req, res) {
    savePostInDB(req, res);
  },
  deletePost: function (req, res) {
    deletePost(req, res);
  },
};
