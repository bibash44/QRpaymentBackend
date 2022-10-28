const app = (module.exports = require("express")());
require("dotenv").config;
const email= require('../AUTH/email')
const sms= require('../AUTH/sms')
app.get("/", (req, res) => {
  res.send({ msg: `server is on at port ${process.env.PORT}` });
});

app.use('/user', require('./user'))
app.use('/transaction', require('./transaction'))

