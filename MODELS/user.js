const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phonenumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", UserSchema);
module.exports = user;
