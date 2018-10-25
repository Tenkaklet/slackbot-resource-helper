const SlackBot = require('slackbots');
const request = require('request');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-416906710166-463631229057-TQclrJ2gD8fU6YeoZO6g7Ds9',
    name: 'resource_helper'
});

bot.on('start', () => {
    var params = {
        icon_emoji: ':success:'
    }
    bot.postMessageToChannel('test', 'Get info', params);
});

bot.on('error',  (err) => {
    console.log(err);
}); 

// Send message
bot.on('message',  (data) => {
    if (data.type != 'message') {
        return;
    }

    console.log(data);
});