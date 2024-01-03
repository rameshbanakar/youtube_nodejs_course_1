const express = require("express");
const Router = express.Router();
const { signupUser } = require("../Controller/userController");
Router.route("/signup").post(signupUser);
module.exports = Router;