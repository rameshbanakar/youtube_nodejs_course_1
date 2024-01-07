const express = require("express");
const Router = express.Router();
const { signupUser, login, protect } = require("../Controller/userController");
Router.route("/signup").post(signupUser);
Router.route("/login").post(login);
module.exports = Router;