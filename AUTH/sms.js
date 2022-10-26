const Vonage = require('@vonage/server-sdk')
require('dotenv').config()


module.exports = {
    async sendSms(req, res) {
        const vonage = new Vonage({
            apiKey: "e6481191",
            apiSecret: "cYK938UVWF17Hh7N"
        })

      

        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log("Failed to send message.");
                return (err)
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                    return "message sent successsfully"
                    
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    return responseData.messages[0]['error-text']
                }
            }
        })
    }
}

