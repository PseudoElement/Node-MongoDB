const express = require("express");
const postsRoutes = require("./routes/post-routes.js");
const postApiRoutes = require("./routes/api-post-routes.js");
const contactsRoutes = require("./routes/contact-routes.js");
const mongoose = require("mongoose");
const createPath = require("./utils/create-path.js");
const app = express();
const PORT = 80;
const cors = require("cors");
const dataBase = "mongodb://127.0.0.1:27017/my-first-db";
mongoose.set("strictQuery", true);
mongoose //connection DataBase
  .connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true }) //parameters in {} are unnesessary
  .then((res) => console.log("Connected to DataBase"))
  .catch((e) => console.error(`My error: ${e}`));
app.set("view engine", "ejs");
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Port ${PORT} is working...`);
});
app.use(express.static("middleware")); //делает папку видимой для браузера
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(postsRoutes); ////подключаем код из другого модуля
app.use(contactsRoutes);
app.use(postApiRoutes);
app.use(
  cors({
    //для получения доступа к апи с любого домена
    origin: "*",
  })
);
app.use((req, res) => {
  const title = "Error";
  res.status(404).render(createPath("error"), { title });
  //      ^ ====  res.statusCode = 404;
});
