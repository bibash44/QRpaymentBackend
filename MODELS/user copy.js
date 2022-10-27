const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const transactionSchema = new Schema({
  sender: {
    type: String,
    required: true
  },

  recipient: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true
  },

  date: {
    type: String,
    default: Date.now
  },



});

const transaction = mongoose.model("Transactions", transactionSchema);
module.exports = transaction;
