const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const custumError = require("./errorHandler");
const util = require("util");
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
      data: user,
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
    let userFind = await User.findOne({ email }).select("+password");
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
      data: userFind,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    //1.read the token and check if it xist
    const testToken = req.headers.authorization;

    if (testToken && testToken.startsWith("Bearer")) {
      token = testToken.split(" ")[1];
    }
    if (!testToken) {
      return res.status(401).send("you are not logged in");
    }

    let decode = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STRING
    );

    const userId = decode.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.send("user with the given token doesn't exist");
    }

    if (user.isPasswordChangedAt(decode.iat)) {
      return res
        .status(401)
        .send({
          status: "failed",
          message: "password has changed recently,Please login again",
        });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.send(error.message);
  }
};

exports.restrict = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send({
        status: "failed",
        message: "user don't have permission to perform this task",
      });
    }
    next();
  };
};
