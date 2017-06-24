// I would comment this up, but honestly its too hacked together for me to even know what it does. I will however point out what you need to change to make it work for you
//Also dont forget to make the config.json file, or run setup.bat for an easy config. 
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
    url: 'https://api.github.com/users/dragonballzeke/events/public', //Change `dragonballzeke` to your github username
    method: 'GET',
    headers: {
        'User-Agent': 'dragonballzeke' //same here
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
		const slackMessage =  `latest commit '${commitMessage}' in repo '${event.repo.name}'`; //here you can customize the message. 
		console.log('slackMessage', slackMessage);
		setSlackStatus(config.token,slackMessage);
		return slackMessage;
	}
	return '';
}	
})
}

getLatestCommit(); 