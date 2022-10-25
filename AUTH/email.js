var nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {


    async sendEmail(req, res) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASSWORD
            }
        })


        try {
            let responeFromEmail = await transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to: req.body.email,
                subject: 'Verify',
                text: 'Hello ',
                html: '<h1> How are you my friend </h1>'
            })

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify(
                    {
                        success: true,
                        msg: "Email send successfully",
                    },
                    null,
                    3
                )
            );

            console.log(responeFromEmail)
        } catch (err) {
            console.log(err)
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify(
                    {
                        success: false,
                        msg: "Failed to send email " + err.toString(),
                    },
                    null,
                    3
                )
            );
        }
    }
}