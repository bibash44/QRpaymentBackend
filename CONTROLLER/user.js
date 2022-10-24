const userModel = require("../MODELS/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async signInUser(req, res) {
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

  async UpdateOrsignInWithGoogle(req, res) {
    const payload  = req.body;
   
   const responseFromDB= await userModel
      .updateMany({ email: req.body.email } , payload, { upsert: true})

      console.log(responseFromDB.upsertedCount)
      if(responseFromDB.upsertedCount==0){
        // if means data has been updated
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: true,
              msg: payload.email.includes("@gmail.com")? "Welcome "+payload.fullname : " updated successfully"
            },
            null,
            3
          )
        );
      }
      else if(responseFromDB.upsertedCount==1){
        // it means new user has been registered
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify(
              {
                success: true,
                msg: payload.email.includes("@gmail.com")? "Welcome "+payload.fullname : " "
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
              msg: "Something went wrong please try again"
            },
            null,
            3
          )
        );
    }
      
      // .then((result) => {
      //   console.log(result)
      //   if (result == null) {
          
      //     res.writeHead(200, { "Content-Type": "application/json" });
      //     res.end(
      //       JSON.stringify(
      //         {
      //           success: false,
      //           msg: "Failed to login",
      //         },
      //         null,
      //         3
      //       )
      //     );
      //   } else {
      //     res.writeHead(200, { "Content-Type": "application/json" });
      //   res.end(
      //     JSON.stringify(
      //       {
      //         success: false,
      //         msg: "Failed to update",
      //       },
      //       null,
      //       3
      //     )
      //   );
      //   }
      // })
      // .catch(function (error) {
      //   res.writeHead(500, { "Content-Type": "application/json" });
      //   res.end(
      //     JSON.stringify(
      //       {
      //         success: false,
      //         msg: "Failed to login",
      //       },
      //       null,
      //       3
      //     )
      //   );
      // });
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

  
};
