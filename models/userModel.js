const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
