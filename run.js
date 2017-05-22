const axios = require("axios");
const querystring = require("querystring")
setSlackStatus("xoxp-2153102999-43747307477-169771286404-a162977af9ba28c0f912f58e353ca7e5","test")
function setSlackStatus(token, status) {
    return axios.post("https://slack.com/api/users.profile.set",
        querystring.stringify({
            token: token,
            profile: JSON.stringify({
										"status_text": "once i finish my code my last commit will be here",
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
