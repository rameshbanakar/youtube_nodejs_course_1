const mongoose=require("mongoose")
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
  },
  email: {
    type: String,
    required: [true, "please enter the email"],
    unique: true,
    validate: [validator.isEmail, "please enter the valid email id"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: [true, "please enter the confirmation password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "password and confirm password is not matching ",
    },
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;