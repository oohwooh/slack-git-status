const request = require('request');
const axios = require("axios");
const querystring = require("querystring")
const config = require('./config.json')
function setSlackStatus(token, status) {
    return axios.post("https://slack.com/api/users.profile.set",
        querystring.stringify({
            token: token,
            profile: JSON.stringify({
										"status_text": status,
										"status_emoji": ":github:"
})
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
            console.log("Set Slack status API response: %j", response.data);
        })
        .catch(function(error) {
           console.error("Set Slack status error: %s", error); 
        });
}

function getLatestCommit() {
	const options = {  
    url: 'https://api.github.com/users/dragonballzeke/events/public',
    method: 'GET',
    headers: {
        'User-Agent': 'dragonballzeke',
	}
	}
	request(options, function(err, res, body) {  
    let json = JSON.parse(body);
	console.log("debug");
	//console.log(json);
	formatCommitMessage(json);
	function formatCommitMessage(json){
	let event = json.find(x=> x.type === 'PushEvent');
	if(event){
		let firstCommitMessage =  event.payload.commits[0];
		const commitMessage =  firstCommitMessage ? firstCommitMessage.message : '';
		const slackMessage =  `latest commit '${commitMessage}' in repo '${event.repo.name}' at ${event.created_at}`;
		console.log('slackMessage', slackMessage);
		setSlackStatus(config.token,slackMessage);
		return slackMessage;
	}
	return '';
}	
})
}

getLatestCommit();