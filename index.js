const SlackBot = require('slackbots');
const request = require('request');
const signale = require('signale');
const axios = require('axios');



const bot = new SlackBot({
    token: 'xoxb-416906710166-463631229057-TQclrJ2gD8fU6YeoZO6g7Ds9',
    name: 'resource_helper'
});

bot.on('start', () => {
    var params = {
        icon_emoji: ':success:'
    }
    bot.postMessageToChannel('test', getFromStackApi, params);
});

bot.on('error', (err) => {
    console.log(err);
});

// Send message
bot.on('message', (data) => {
    if (data.type != 'message') {
        return;
    }
    getFromStackApi(data.text);
});

// Respond to data
// function sendReturnData(message) {
//     signale.debug(message);
//     return message;
// }

// get request data from Stackoverflow
function getFromStackApi (query) {
    axios.get(`http://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow&tagged=${query}`)
    .then(function (res) {
        signale.success('res -> ', res.data);
    });
}