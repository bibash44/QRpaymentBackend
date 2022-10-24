const app = (module.exports = require("express")());
require("dotenv").config;

app.get("/", (req, res) => {
  res.send({ msg: `server is on at port ${process.env.PORT}` });
});

app.use('/user', require('./user'))
// Routes registeration
// app.use('/user', require('./user'))
