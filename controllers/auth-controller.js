const User = require("../models/User.js");
const Role = require("../models/Role.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config.js");
const createPath = require("../utils/create-path.js");
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};
class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Can't be empty", status: 400 });
      }
      console.log(`Registration: ${JSON.stringify(req.body)}`);
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User ${username} already exists.`, status: 400 });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({
        message: "User is added successfully.",
        username,
        status: 200,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} is not found.`, status: 400 });
      }
      const validPassword = bcrypt.compareSync(password, user.password); //check password
      if (!validPassword) {
        return res
          .status(400)
          .send({ status: 400, message: "Invalid Password." });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.status(200).send({ token, username, status: 200 });
    } catch (e) {
      console.log(e);
      res.status(400).json({ status: 400, message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      // const userRole = new Role({value: 'USER'})///to create roles
      // const adminRole = new Role({value: 'ADMIN'})
      // await userRole.save();
      // await adminRole.save();
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new AuthController();
