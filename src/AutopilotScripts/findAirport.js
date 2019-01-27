require('dotenv').config()
const AccountSID = process.env.AccountSID
const AuthToken = process.env.AuthToken
const TwilioClient = require('twilio')(AccountSID, AuthToken)


let airportCode = {
	"actions": [
		{
			"collect": {
				"name": "airport_code",
				"questions": [
					{
						"question": {
							"say": "Great, I can help you with that. What's the first letter?"
						},
						"name": "airport_namecodeone",
						"type": "Twilio.FIRST_NAME"
					},
					{
						"question": {
							"say": "What's the second letter?"
						},
						"name": "airport_namecodetwo",
						"type": "Twilio.FIRST_NAME"
					},
					{
						"question": {
							"say": "What's the third letter?"
						},
						"name": "airport_namecodethree",
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
                    uniqueName: 'find-airport',
                    actions: airportCode
                  })
                  .then(assistant => console.log(assistant.sid))
                  .done()

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
            .create({uniqueName: 'v0.9'})
            .then(model_build => console.log(model_build.sid))
            .done()


let foundAirportCode = {
    "actions": [
		{
			"redirect": {
				"uri": "https://cordovan-jaguar-6347.twil.io/AirportByCode"
			}
		}
	]
}

TwilioClient.autopilot.assistants(process.env.AssistantSID)
                  .tasks
                  .create({
                    uniqueName: 'foundairport',
                    actions: foundAirportCode
                  })
                  .then(assistant => console.log(assistant.sid))
                  .done()

let foundAirportPhrases = ["Airport found"]

foundAirportPhrases.forEach(function(item) {
    let sample = TwilioClient.autopilot.assistants(process.env.AssistantSID)
    .tasks('foundairport')
    .samples
    .create({
        language: 'en-us',
        taggedText: item,
            })
    .then(sample => console.log(sample.sid))
    .done()
})
