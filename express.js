const express = require("express");
require("dotenv").config();
const chalk = require("chalk"); //change color of text in console
const errorMessage = chalk.bgKeyword("purple").redBright;
const successMessage = chalk.bgKeyword("green").white;
const postsRoutes = require("./routes/post-routes.js");
const postApiRoutes = require("./routes/api-post-routes.js");
const contactsRoutes = require("./routes/contact-routes.js");
const authRoutes = require('./routes/auth-routes.js')
const mongoose = require("mongoose");
const createPath = require("./utils/create-path.js");
const app = express();
const cors = require("cors");
mongoose.set("strictQuery", true);
mongoose //connection DataBase
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }) //parameters in {} are unnesessary
  .then((res) => console.log(successMessage("Connected to DataBase")))
  .catch((e) => console.error(`My error: ${errorMessage(e)}`));
app.set("view engine", "ejs"); 
app.listen(process.env.PORT, (err) => {
  err ? console.log(err) : console.log(`Port ${process.env.PORT} is working...`);
});
app.use(express.static("middleware")); //делает папку видимой для браузера
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/auth', authRoutes);
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
