const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
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
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordExpireDate: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
  }
});
userSchema.methods.isPasswordChangedAt = function (timeStamp) {
  if (this.passwordChangedAt) {
    let passwordChangeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passwordChangeTimeStamp > timeStamp) {
      return true;
    }
    if (passwordChangeTimeStamp < timeStamp) {
      return false;
    }
  }
  return false;
};
userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordExpireDate = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
