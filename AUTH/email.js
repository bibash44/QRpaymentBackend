var nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {


    async sendEmail(receipentEmail, Subject, descriptionWithHtml) {

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
                to: receipentEmail,
                subject: Subject,
                html: descriptionWithHtml
            })

            return responeFromEmail
        } catch (err) {
            console.log(err)
            return err
        }
    }
}