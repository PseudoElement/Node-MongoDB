const express = require("express");
const mongoose = require("mongoose");
const postModule = require("./models/post.js");
const contactModule = require("./models/contact.js");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 80;
const cors = require("cors");
const createPath = (page) => path.join(__dirname, `./views/${page}.ejs`);
const dataBase = "mongodb://127.0.0.1:27017/my-first-db";
mongoose.set("strictQuery", true);
mongoose
  .connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true }) //parameters in {} are unnesessary
  .then((res) => console.log("Connected to DataBase"))
  .catch((e) => console.error(`My error: ${e}`));
app.set("view engine", "ejs");
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Port ${PORT} is working...`);
});
app.use(
  cors({
    //для получения доступа к апи с любого домена
    origin: "*",
  })
);
app.use(express.static("middleware")); //делает папку видимой для браузера
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/posts", (req, res) => {
  const title = "Posts";
  res.render(createPath("posts"), { title });
});
////////////SEND DATA TO MONGODB
app.get("/posts-mongodb", (req, res) => {
  const title = "Sending in mongoDB";
  res.render(createPath("posts-mongoDB"), { title });
});
app.get('/data-from-db', (req, res)=>{
  postModule.post
  .find()
  .then((posts) => res.send(posts))
  .catch((e) => res.render(createPath("error"), { title: "Error" }));
})
app.post("/add-post-in-mongoDB", (req, res) => {
  const { text, author, time, date } = req.body;
  const post = new postModule.post({ author, text, time, date });
  post
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => res.render(createPath("error"), { title: "Error" }));
});
//////////////DEND DATA TO INNER JSON-FILE
app.post("/post-delete", (req, res) => {
  console.log(req.body);
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
});
app.post("/post-data", (req, res) => {
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
    parsedData["array"].push(reqBODY);
    return JSON.stringify(parsedData);
  }
  const jsonData = getJson(req.body, parsedData, maxID);
  fs.writeFileSync("./views/scriptsForHTML/postsData.json", jsonData);
  res.send(req.body);
});
//////////////CREATE EMPTY PAGE WITH ARRAY
app.get("/api", (req, res) => {
  res.send([
    { name: "Sashka", weight: 150 + ` (centners of course)`, id: 1 },
    { name: "Sintol", weight: 88, id: 2 },
    { name: "Ivan", weight: 75, id: 3 },
  ]);
  res.end();
});
app.get("/", (req, res) => {
  const title = "Home page";
  res.render(createPath("index3"), { title });
});
app.get("/contacts", (req, res) => {
  //ДОБАВЛЕНИЕ ССЫЛОК ИЗ БАЗЫ ДАННЫХ
  const title = "Contacts";
  contactModule.contact
    .find()
    .then((contacts) => res.render(createPath("contacts"), { contacts, title }))
    .catch((e) => res.render(createPath("error"), { title: "Error" }));
});
app.get("/info", (req, res) => {
  res.redirect("/contacts");
});
app.get("/about-us", (req, res) => {
  const title = "About us";
  res.render(createPath("about-us"), { title });
});
app.use((req, res) => {
  const title = "Error";
  res.status(404).render(createPath("error"), { title });
  //      ^ ====  res.statusCode = 404;
});
