const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
  },

  phonenumber: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: ""
  },

  password: {
    type: String,
  },

  totalamount: {
    type: Number,
    default: 0.1
  },
  emailverified: {
    type: Boolean,
    default: false
  }

});

const user = mongoose.model("User", UserSchema);
module.exports = user;
