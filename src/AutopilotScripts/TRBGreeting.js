require('dotenv').config()
const AccountSID = process.env.AccountSID
const AuthToken = process.env.AuthToken
const TwilioClient = require('twilio')(AccountSID, AuthToken)

let greetingPhrases = ['hello','hi','Hello','Hi there','Hola','Hey there','greetings']

greetingPhrases.forEach(function(item) {
  let sample = TwilioClient.autopilot.assistants(process.env.AssistantSID)
                           .tasks('initial-greeting')
                           .samples
                           .create({
                             language: 'en-us',
                             taggedText: item,
                           })
                           .then(sample => console.log(sample.sid))
                           .done();
})


TwilioClient.autopilot.assistants(process.env.AssistantSID)
                .defaults()
                .update({defaults: {
                     defaults: {
                         assistant_initiation: 'task://initial-greeting',
                         fallback: 'task://initial-greeting'
                     }
                 }})
                .then(defaults => console.log(defaults.assistantSid))
                .done()


TwilioClient.autopilot.assistants(process.env.AssistantSID)
            .modelBuilds
            .create({uniqueName: 'v0.1'})
            .then(model_build => console.log(model_build.sid))
            .done()