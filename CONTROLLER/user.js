const userModel = require("../MODELS/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sendEmail = require('../AUTH/email')

module.exports = {
  async signInUser(req, res) {
    const { email, password } = req.body;
    await userModel
      .findOne({ email: email })
      .then((result) => {
        if (result == null) {
          console.log("user not found");
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify(
              {
                success: false,
                msg: "Creditianls doesnot match the record, login failed",
              },
              null,
              3
            )
          );
        } else {
          bcrypt.compare(password, result.password, (err, passwordresult) => {
            if (passwordresult) {
              const token = jwt.sign(
                { email: passwordresult.email, id: passwordresult.id },
                "&^&*&&*dsadsa52153sddsaBSdassh6565",
                { expiresIn: "7d" }
              );

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify(
                  {
                    success: true,
                    msg: "Welcome " + result.fullname,
                    token: token,
                    data: result,
                  },
                  null,
                  3
                )
              );
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify(
                  {
                    success: false,
                    msg: "Invalid email and password, login failed",
                  },
                  null,
                  3
                )
              );
            }
          });
        }
      })
      .catch(function (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: false,
              msg: "Failed to login",
            },
            null,
            3
          )
        );
      });
  },

  async getUserData(req, res) {
    console.log(req.params)
    await userModel
      .findOne({ _id: req.params.userid })
      .then((result) => {
        if (result == null) {
          console.log("user not found");
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify(
              {
                success: false,
                msg: "User not found",
              },
              null,
              3
            )
          );
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify(
              {
                success: true,
                msg: "User found " + result.fullname,
                data: result,
              },
              null,
              3
            )
          );
        }
      })
      .catch(function (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: false,
              msg: "Failed to retrive data",
            },
            null,
            3
          )
        );
      });
  },

  async signInOrSignUpGoogleUser(req, res) {
    var { fullname, email } = req.body;

    if (email.includes("@gmail.com")) {
      await userModel.findOne({ email: email }).then((result) => {
        if (result == null) {
          console.log("userdoesnot exit")

          const newuser = new userModel({
            fullname: fullname,
            email: email,
          });

          newuser
            .save()
            .then((registereduserdata) => {
              var subject = "Account Signup"
              var descriptionWithHtml = `<h1> Hello <br> ${fullname} </h1>
                 <br> <h3> You have signed up as new user </h3>
                  <p> © 2022 QRpay All Rights Reserved || UNITED KINGDOM  </p>`
              var responseFromEmail = sendEmail.sendEmail(email, subject, descriptionWithHtml)
              console.log(responseFromEmail);

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify(
                  {
                    success: true,
                    msg: "New user registered successfully",
                    data: registereduserdata
                  },
                  null,
                  3
                )
              );
            })
            .catch((e) => {
              console.log(e);
              res.end(
                JSON.stringify(
                  {
                    success: false,
                    msg: "Failed to register new user",
                  },
                  null,
                  3
                )
              );
            });
        }
        else {
          console.log("user exist")

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify(
              {
                success: true,
                msg: "User already exist",
                data: result
              },
              null,
              3
            )
          );


        }
      });

    }
    else {
      await this.signUpUser(req, res)
    }







  },


  async signUpUser(req, res) {
    const { fullname, email, phonenumber, address, password } = req.body;

    userModel.findOne({ email: email }).then((result) => {
      if (result == null) {
        bcrypt.hash(password, saltRounds, function (err, hashpassword) {
          // Store hash in your password DB.
          const newuser = new userModel({
            fullname: fullname,
            email: email,
            phonenumber: phonenumber,
            address: address,
            password: hashpassword,
          });

          newuser
            .save()
            .then(() => {
              var subject = "Account Signup"
              var descriptionWithHtml = `<h1> Hello <br> ${fullname} </h1>
               <br> <h3> You have signed up as new user </h3>
                <p> © 2022 QRpay All Rights Reserved || UNITED KINGDOM  </p>`
              var responseFromEmail = sendEmail.sendEmail(email, subject, descriptionWithHtml)
              console.log(responseFromEmail);

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify(
                  {
                    success: true,
                    msg: "New User registered successfully",
                  },
                  null,
                  3
                )
              );
            })
            .catch((e) => {
              console.log(e);
              res.end(
                JSON.stringify(
                  {
                    success: false,
                    msg: "Failed to register new user",
                  },
                  null,
                  3
                )
              );
            });
        });
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: false,
              msg: "User already exist",
            },
            null,
            3
          )
        );
      }
    });
  },

  async updateUser(req, res) {

    var responseFromDatabase = await userModel.findOneAndUpdate({ _id: req.params.userid }, req.body, { upsert: false, new: true });
    delete responseFromDatabase['password']
    if (responseFromDatabase != null) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          {
            success: true,
            msg: "Successfully updated ",
          },
          null,
          3
        )
      );
    }
    else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          {
            success: false,
            msg: "Something went wrong please try again ",
          },
          null,
          3
        )
      );
    }


  },

  async verifyQrData(req, res) {
    const { receipentid, senderid } = req.body;
    await userModel
      .findOne({ _id: receipentid })
      .then((recipientResult) => {
        if (recipientResult == null) {
          console.log("user not found");
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify(
              {
                success: false,
                msg: "Recipient doesnot exist ",
              },
              null,
              3
            )
          );
        } else {

          userModel
            .findOne({ _id: senderid }).then((senderResult) => {
              if (senderResult == null) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify(
                    {
                      success: true,
                      msg: "QR verified and but sender doesnot exist ",
                    },
                    null,
                    3
                  )
                );
              }
              else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify(
                    {
                      success: true,
                      msg: "QR verified ",
                      recipientdata: recipientResult,
                      senderdata: senderResult
                    },
                    null,
                    3
                  )
                );
              }

            })


        }
      })
      .catch(function (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: false,
              msg: "Failed to retrive data",
            },
            null,
            3
          )
        );
      });
  },

  async sendEmail(req, res) {
    var email = req.body.email
    var subject = req.body.subject
    var descriptionWithHtml = `<h1> ${req.body.description} </h1>`
    var responseFromEmail = await sendEmail.sendEmail(email, subject, descriptionWithHtml)

    if (responseFromEmail) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          {
            success: true,
            msg: "Email sent successfully, check your inbox ",
          },
          null,
          3
        )
      );
    }
    else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          {
            success: false,
            msg: "Something went please , please try again ",
          },
          null,
          3
        )
      );
    }

  }
};
