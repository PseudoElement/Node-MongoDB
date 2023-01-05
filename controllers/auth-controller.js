const User = require("../models/User.js");
const express = require("express");
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
        return res.status(400).json({ message: "Can't be empty" });
      }
      console.log(`Registration: ${JSON.stringify(req.body)}`);
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      console.log(`Candidate: ${candidate}`);
      if (candidate) {
        return res.status(400).write("User already exists.");
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "User is added successfully." });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      console.log(`LOGIN: ${JSON.stringify(req.body)}`);
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} is not found.` });
      }
      const validPassword = bcrypt.compareSync(password, user.password); //check password
      console.log(`Is valid password: ${validPassword}`);
      if (!validPassword) {
        return res.status(400).redirect('/error');//////////<-------СТАТУС 400 есть, но не перенаправляет на страницу с ошибкой
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
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
