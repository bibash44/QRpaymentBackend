const userModel = require("../MODELS/user");
const vaccinationModel = require("../MODELS/vaccination");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async loginUser(req, res) {
    const { email, password } = req.body;
    userModel
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

  async registerUser(req, res) {
    const { fullname, email, phonenumber, dob, password, usertype } = req.body;

    userModel.findOne({ email: email }).then((result) => {
      if (result == null) {
        bcrypt.hash(password, saltRounds, function (err, hashpassword) {
          // Store hash in your password DB.
          const newuser = new userModel({
            fullname: fullname,
            email: email,
            phonenumber: phonenumber,
            dob: dob,
            password: hashpassword,
            usertype: usertype,
          });

          newuser
            .save()
            .then(() => {
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

  async registerVaccinationCenter(req, res) {
    const { name, postCode, streetAddress, description } = req.body;

    vaccinationModel.findOne({ email: email }).then((result) => {
      if (result == null) {
        const newVaccinationCenter = new vaccinationModel({
          name: name,
          postCode: postCode,
          streetAddress: streetAddress,
          description: description,
        });

        newVaccinationCenter
          .save()
          .then(() => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify(
                {
                  success: true,
                  msg: "Vaccination Center registered successfully",
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
                  msg: "Failed to register Vaccination Center",
                },
                null,
                3
              )
            );
          });
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: false,
              msg: "Vaccination Center Already Exist",
            },
            null,
            3
          )
        );
      }
    });
  },
};
