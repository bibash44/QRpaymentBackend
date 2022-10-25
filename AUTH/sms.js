const Vonage = require('@vonage/server-sdk')
require('dotenv').config()


module.exports = {
    async sendSms(req, res) {
        const vonage = new Vonage({
            apiKey: "e6481191",
            apiSecret: "cYK938UVWF17Hh7N"
        })

        const from = "QR pay"
        const to = "447497882891"
        const text = 'Hello user'

        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify(
                        {
                            success: false,
                            msg: "Failed to send sms " + err,
                        },
                        null,
                        3
                    )
                );
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                    res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify(
                        {
                            success: true,
                            msg: "Message sent successfully "+err,
                        },
                        null,
                        3
                    )
                );
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify(
                            {
                                success: false,
                                msg: "Failed to send sms " + err,
                            },
                            null,
                            3
                        )
                    );
                }
            }
        })
    }
}

