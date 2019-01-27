require('dotenv').config()
const AccountSID = process.env.AccountSID
const AuthToken = process.env.AuthToken
const TwilioClient = require('twilio')(AccountSID, AuthToken)


let initialGreetingTaskActions = {
    actions: [
      { say: 'Hi there, I\'m Flyam! How can I help you today? - I can book tickets, get flight details and a lot more. Powered by American Airlines.' },
      { listen: true }
    ]
  }
  
TwilioClient.autopilot.assistants(process.env.AssistantSID)
                  .tasks
                  .create({
                    uniqueName: 'initial-greeting',
                    actions: initialGreetingTaskActions,
                  })
                  .then(assistant => console.log(assistant.sid))
                  .done()