require('dotenv').config()
const AccountSID = process.env.AccountSID
const AuthToken = process.env.AuthToken
const TwilioClient = require('twilio')(AccountSID, AuthToken)

let airportCode = {
    actions: [
        {
            "collect": {
                "name": "airport-code",
                "questions": [
                    {
                        "question": {
                            "say": "Great, I can help you find the airport. What's the airport code?"
                        },
                        "name": "code",
                        "type": "Twilio.FIRST_NAME"
                    }
                ],
                "on_complete": {
                    "redirect": "task://find-airport-function"
                }
            }
        }
    ]
}
/*
TwilioClient.autopilot.assistants(process.env.AssistantSID)
                  .tasks
                  .create({
                    uniqueName: 'find-airport',
                    actions: airportCode
                  })
                  .then(assistant => console.log(assistant.sid))
                  .done()
*/
let findAirportPhrases = ["Tell me what airport this code belongs to","what airport has this code","what place is this","which airport is this","where is this","what country is this airport","airport code"]

findAirportPhrases.forEach(function(item) {
    let sample = TwilioClient.autopilot.assistants(process.env.AssistantSID)
    .tasks('find-airport')
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
            .create({uniqueName: 'v0.2'})
            .then(model_build => console.log(model_build.sid))
            .done()