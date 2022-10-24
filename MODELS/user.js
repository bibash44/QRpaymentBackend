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

  address: {
    type: String,
  },

  password: {
    type: String,
  },

});

const user = mongoose.model("User", UserSchema);
module.exports = user;
