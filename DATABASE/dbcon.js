const mongoose = require("mongoose");

connect().catch((err) => console.log(err));

async function connect() {
  mongoose.connect(
    // "mongodb+srv://shakyab:shakyab@cluster0.ak9au.mongodb.net/covac",
    "mongodb://localhost:27017/qrpay",
    {
      useNewUrlParser: true,
    }
  );
}

async function disconnect(){
  mongoose.disconnect();
}

module.exports = {connect, disconnect}

