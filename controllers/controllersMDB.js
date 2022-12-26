const createPath = require("../utils/create-path.js");
const postModule = require("../models/post.js");
const fs = require("fs");
function renderPosts(req, res) {
  const title = "Sending in mongoDB";
  res.render(createPath("posts-mongoDB"), { title });
}
function sendDataFromDB(req, res) {
  postModule.post
    .find()
    .then((posts) => res.send(posts))
    .catch((e) => res.render(createPath("error"), { title: "Error" }));
}
function savePostInDB(req, res) {
  const { text, author, time, date } = req.body;
  const post = new postModule.post({ author, text, time, date });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((e) => res.render(createPath("error"), { title: "Error" }));
}
function deletePost(req, res) {
  postModule.post
    .findByIdAndDelete(req.body.id)//IF YOU NEED TO UPDATE/CHANGE YOUR POST - USE .findByIdAndUpdate(id, {})
    .then((result) => res.sendStatus(200));
}
function deletePostJSON(req, res) {
  let data = fs.readFileSync("./views/scriptsForHTML/postsData.json", "utf-8");
  let parsedData = JSON.parse(data);
  parsedData.array.forEach((post) => {
    if (post.id === req.body.id) {
      parsedData.array.splice(parsedData.array.indexOf(post), 1);
    }
  });
  fs.writeFileSync(
    "./views/scriptsForHTML/postsData.json",
    JSON.stringify(parsedData)
  );
  res.send(req.body);
}
function addPostJSON(req, res) {
  let data = fs.readFileSync("./views/scriptsForHTML/postsData.json", "utf-8");
  let parsedData = JSON.parse(data);
  let maxID = 0;
  parsedData["array"].forEach((el) => {
    if (el.id >= maxID) maxID = el.id + 1;
  });
  function getJson(reqBODY, parsedData, maxID) {
    reqBODY.id = maxID;
    reqBODY.date = new Date().toLocaleDateString();
    reqBODY.time = new Date().toLocaleTimeString();
    parsedData.array.push(reqBODY);
    return JSON.stringify(parsedData);
  }
  const jsonData = getJson(req.body, parsedData, maxID);
  fs.writeFileSync("./views/scriptsForHTML/postsData.json", jsonData);
  res.send(req.body);
}
module.exports = {
  renderPosts: function (req, res) {
    renderPosts(req, res);
  },
  sendDataFromDB: function (req, res) {
    sendDataFromDB(req, res);
  },
  savePostInDB: function (req, res) {
    savePostInDB(req, res);
  },
  deletePost: function (req, res) {
    deletePost(req, res);
  },
  deletePostJSON: function (req, res) {
    deletePostJSON(req, res);
  },
  addPostJSON: function (req, res) {
    addPostJSON(req, res);
  },
};
