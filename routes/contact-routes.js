const express  = require('express');
const router = express.Router();
const contactModule = require("../models/contact.js");
const createPath = require('../utils/create-path.js')
router.get("/contacts", (req, res) => {
    //ДОБАВЛЕНИЕ ССЫЛОК ИЗ БАЗЫ ДАННЫХ
    const title = "Contacts";
    contactModule.contact
      .find()
      .then((contacts) => res.render(createPath("contacts"), { contacts, title }))
      .catch((e) => res.render(createPath("error"), { title: "Error" }));
  });
  module.exports = router;