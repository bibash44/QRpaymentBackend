const mongoose = require("mongoose");
require('dotenv').config()
connect().catch((err) => console.log(err));

async function connect() {
  mongoose.connect(
    // "mongodb+srv://shakyab:shakyab@cluster0.ak9au.mongodb.net/covac",
    // "mongodb+srv://bib4sh:Bibash@cluster0.ak9au.mongodb.net/qrpay",
    // "mongodb+srv://bib4sh:Bibash@cluster0.8y79ias.mongodb.net/qrpay",
    process.env.MONGODBURL,
    // 'mongodb+srv://cluster0.8y79ias.mongodb.net/qrpay',
    // "mongodb://localhost:27017/qrpay",
    {
      useNewUrlParser: true,
    }
  );
}

async function disconnect() {
  mongoose.disconnect();
}

module.exports = { connect, disconnect }

