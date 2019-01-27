require('dotenv').config()
const AccountSID = process.env.AccountSID
const AuthToken = process.env.AuthToken
const TwilioClient = require('twilio')(AccountSID, AuthToken)

/*
let userDetailsActions = {
        "actions": [
            {
                "collect": {
                    "name": "user_details",
                    "questions": [
                        {
                            "question": {
                                "say": "Great, I can help you with that. What's the first name?"
                            },
                            "name": "first_name",
                            "type": "Twilio.FIRST_NAME"
                        },
                        {
                            "question": {
                                "say": "What's your last name?"
                            },
                            "name": "last_name",
                            "type": "Twilio.LAST_NAME"
                        },
                        {
                            "question": {
                                "say": "What's your email?"
                            },
                            "name": "user_email",
                            "type": "Twilio.EMAIL"
                        },
                        {
                            "question": {
                                "say": "What's your gender?"
                            },
                            "name": "user_gender",
                            "type": "Twilio.FIRST_NAME"
                        }
                    ],
                    "on_complete": {
                        "redirect": "task://foundairport"
                    }
                }
            }
        ]
    }

TwilioClient.autopilot.assistants(process.env.AssistantSID)
    .tasks
    .create({
      uniqueName: 'user-details',
      actions: userDetailsActions,
    })
    .then(assistant => console.log(assistant.sid))
    .done()
*/

let registerUserPhrases = ["Create an account","sign up","register my account","register","create user","sign up for account","join account"]

registerUserPhrases.forEach(function(item) {
    let sample = TwilioClient.autopilot.assistants(process.env.AssistantSID)
    .tasks('user-details')
    .samples
    .create({
        language: 'en-us',
        taggedText: item,
            })
    .then(sample => console.log(sample.sid))
    .done()
})

TwilioClient.autopilot.assistants(process.env.AssistantSID)
            .modelBuilds
            .create({uniqueName: 'v0.9.0.5'})
            .then(model_build => console.log(model_build.sid))
            .done()

