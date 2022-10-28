const transactionModel = require("../MODELS/transaction");
const userModel = require("../MODELS/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sendEmail = require('../AUTH/email')

module.exports = {

  async makeTranscation(req, res) {
    const { sender, recipient, amount, remarks } = req.body;

    const newTransaction = new transactionModel({
      sender: sender,
      recipient: recipient,
      amount: amount,
      remarks: remarks
    })

    var transactionMade = await newTransaction.save();


    if (transactionMade != null) {
      const findAndUpdateSenderAmount = await userModel.findOneAndUpdate({ _id: sender }, {
        $inc: { totalamount: -amount }
      },
        { new: true })

      const findAndUpdateRecipientAmount = await userModel.findOneAndUpdate({ _id: recipient }, {
        $inc: { totalamount: +amount }
      },
        { new: true })

      if (findAndUpdateRecipientAmount != null && findAndUpdateRecipientAmount != null) {
        delete findAndUpdateRecipientAmount.password
        delete findAndUpdateSenderAmount.password

        var subjectForSender = "Payment made"
        var descriptionWithHtmlForSender = `<h1> Hello <br> ${findAndUpdateSenderAmount.fullname} </h1>
         <br> <h3> You have made the payment of £${amount} to ${findAndUpdateRecipientAmount.fullname} </h3> <br>
         <h3> Total amount remaining : £${findAndUpdateSenderAmount.totalamount} <h3>
          <p> © 2022 QRpay All Rights Reserved || UNITED KINGDOM  </p>`

        var subjectForRecipient = "Payment received"
        var descriptionWithHtmlForRecipient = `<h1> Hello <br> ${findAndUpdateRecipientAmount.fullname} </h1>
           <br> <h3> You received £${amount} from ${findAndUpdateSenderAmount.fullname} </h3> <br>
           <h3> Total amount remaining : £${findAndUpdateRecipientAmount.totalamount} <h3>
            <p> © 2022 QRpay All Rights Reserved || UNITED KINGDOM  </p>`

        var paymentMadeEmail = sendEmail.sendEmail(findAndUpdateSenderAmount.email, subjectForSender, descriptionWithHtmlForSender)

        var paymentReceivedEmail = sendEmail.sendEmail(findAndUpdateRecipientAmount.email, subjectForRecipient, descriptionWithHtmlForRecipient)
        
        console.log("payment Made "+paymentMadeEmail)
        console.log("payment Received "+paymentReceivedEmail)

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              success: true,
              msg: "You have successfully sent GBP" + amount + " to " + findAndUpdateRecipientAmount.fullname,
              recipientdata: findAndUpdateRecipientAmount,
              senderdata: findAndUpdateSenderAmount
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
              msg: "Payment didnot go through, please try again ",

            },
            null,
            3
          ));
      }

    }
    else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          {
            success: false,
            msg: "Transaction failed, try again later ",

          },
          null,
          3
        ));
    }



  },

  async getReceivedTransaction(req, res) {
    const { recipient } = req.params.recipient

    const findReceipent = transactionModel.find({ recipient: recipient })

    print(findReceipent)
  }

};
