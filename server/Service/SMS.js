const Nexmo = require('nexmo');
const ACCOUNT_ID = process.env.ACCOUNT_ID
const ACCOUNT_SECRET = process.env.ACCOUNT_SECRET
const SENDER = process.env.SENDER

const client = require('twilio')(ACCOUNT_ID, ACCOUNT_SECRET);

let model = {
    send: async function (to, text) {
        try {
            let promise = new Promise((resolve,reject)=>{
                client.messages
                .create({
                    to: "+91"+to,
                    from:SENDER,
                    body: text,
                })
                .then(message=>{
                    console.log(`Message SID ${message.sid}`)
                    resolve(message)
                })
                .catch(err=>{
                    console.log("ERROR",err)
                    reject(err)
                })
            })
            await promise
            return "SMS Send"
        } catch (error) {
            throw error
        }
    }
}
module.exports = model