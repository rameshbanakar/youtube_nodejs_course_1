const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.signupUser = async (req, res, next) => {
  try {
    let newUser = req.body;
    let user = new User(newUser);
    await user.save();
    let token = jwt.sign({ id: user._id }, process.env.SECRET_STRING, {
      expiresIn: "1d",
    });
    res.status(201).send({
      status: "success",
      token: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let userFind = await User.findOne({ email });
    if (!userFind) {
      res.status(404).send("user account doesn't exist");
    }
    let isMatch = await bcrypt.compare(password, userFind.password);
    if (!isMatch) {
      res.send("invalid passwordf or email id");
    }
    let token = jwt.sign({ id: userFind._id }, process.env.SECRET_STRING, {
      expiresIn: "1d",
    });
    res.status(201).send({
      status: "success",
      token: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};
