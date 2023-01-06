const express = require("express");
const {
  renderPosts,
  sendDataFromDB, ///destruction of Object
  savePostInDB,
  deletePost,
  deletePostJSON,
  addPostJSON,
} = require("../controllers/controllersMDB.js");
const fs = require("fs");
const router = express.Router();
const createPath = require("../utils/create-path.js");
router.get("/posts", (req, res) => {
  const title = "Posts";
  res.render(createPath("posts"), { title });
});
router.get("/authorization", (req, res) => {
  const title = "Log In";
  res.render(createPath("login"), { title });
});
router.get("/sign-up", (req, res) => {
  const title = "Registration";
  res.render(createPath("registr"), { title });
});
////////////SEND DATA TO MONGODB
router.get("/posts-mongodb", renderPosts);
router.get("/data-from-db", sendDataFromDB);
router.post("/add-post-in-mongoDB", savePostInDB);
router.post("/delete-post-mongoDB", deletePost);
//////////////SEND DATA TO INNER JSON-FILE
router.post("/post-delete", deletePostJSON);
router.post("/post-data", addPostJSON);
//////////////CREATE EMPTY PAGE WITH ARRAY
router.get("/api", (req, res) => {
  res.send([
    { name: "Sashka", weight: 150 + ` (centners of course)`, id: 1 },
    { name: "Sintol", weight: 88, id: 2 },
    { name: "Ivan", weight: 75, id: 3 },
  ]);
  res.end();
});
router.get("/", (req, res) => {
  const title = "Home page";
  res.render(createPath("index3"), { title });
});
router.post("/", (req, res) => {
  const { token, username } = req.body;
  console.log(`TOKEN: ${token}`); //////а сюда прилетает undefined
  console.log(`Username: ${username}`);
  const title = "Home page";
  res.render(createPath("indexForAuthorizedUsers"), { title, username }, true);
});
router.get("/info", (req, res) => {
  res.redirect("/contacts");
});
router.get("/about-us", (req, res) => {
  console.log(`ABOUT US REQUEST:` + JSON.stringify(req.body));
  const title = "About us";
  res.render(createPath("about-us"), { title });
});
module.exports = router;
