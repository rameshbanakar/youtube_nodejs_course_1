const User = require("../Models/userModel");
exports.signupUser = async (req, res,next) => {
  try {
    let newUser = req.body;
    let user = new User(newUser);
    await user.save();
    res.status(201).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};
