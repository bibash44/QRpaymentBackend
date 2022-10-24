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
  },

  address: {
    type: String,
    required: true
  },

  password: {
    type: String,
  },

});

const user = mongoose.model("User", UserSchema);
module.exports = user;
