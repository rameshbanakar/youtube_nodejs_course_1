const express = require("express");
const Router = express.Router();
const {
  signupUser,
  login,
  protect,
  passwordReset,
  forgotPassword
} = require("../Controller/userController");
Router.route("/signup").post(signupUser);
Router.route("/login").post(login);
Router.route("/forgotPassword").post(forgotPassword);
Router.route("/resetPassword/:token").post(passwordReset);
module.exports = Router;