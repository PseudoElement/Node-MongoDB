const { Router } = require("express");
const router = new Router();
const controller = require("../controllers/auth-controller.js");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware.js");
const roleMiddleware = require("../middleware/roleMiddleware.js");
router.post(
  "/registration",
  check("username", "Can't add empty username").notEmpty(),
  check(
    "password",
    "Length shoud be more then 5 symbols and less then 21."
  ).isLength({ min: 5, max: 20 }),
  controller.registration
);
router.post("/login", controller.login);
router.get("/users",roleMiddleware(['ADMIN']), controller.getUsers);
module.exports = router;
