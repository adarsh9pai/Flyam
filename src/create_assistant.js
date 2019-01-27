require('dotenv').config()
const AccountSID = process.env.AccountSID
const AuthToken = process.env.AuthToken
const TwilioClient = require('twilio')(AccountSID, AuthToken)

TwilioClient.autopilot.assistants.create({
    friendlyName: 'Flyam: Customer Service excellence by American Airlines',
    uniqueName: 'Flyam'
})
.then(assistant => console.log(assistant.sid))
.done()
