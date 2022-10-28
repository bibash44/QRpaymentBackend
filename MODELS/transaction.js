const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const transactionSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  amount: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },



});

const transaction = mongoose.model("Transaction", transactionSchema);
module.exports = transaction;
