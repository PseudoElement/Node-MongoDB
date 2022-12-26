const express = require("express");
const {
  sendDataFromDB,///destruction of Object
  savePostInDB,
  deletePost,
} = require("../controllers//api-controllersMDB.js");
const fs = require("fs");
const router = express.Router();
//Get all posts
router.get("/api/data-from-db", sendDataFromDB);
//Add post
router.post("/api/add-post-in-mongoDB", savePostInDB);
//Delete Post
router.post("/api/delete-post-mongoDB", deletePost);
module.exports = router;
