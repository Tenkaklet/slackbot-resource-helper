const SlackBot = require('slackbots');
const request = require('request');
const signale = require('signale');
const axios = require('axios');
var passport = require('passport');
var express = require('express');
var StackExchangeStrategy = require('passport-stack-exchange');
var passCookie = require('passport-cookie');
var User = require('./User');

const cookieSession = require('cookie-session');

var app = express();
signale.watch('watching for Slackbot');

app.use(cookieSession({
    maxAge: Infinity,
    keys: ["getsomehelpfromslack"]
}))



/**
 * Passport session setup
 */
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());


passport.use(new StackExchangeStrategy({
    clientID: 13422,
    clientSecret: 'SwTJSc)yTEin2*ca2**opQ((',
    callbackURL: 'https://d2e297e6.ngrok.io/auth/stack-exchange/callback',
    stackAppsKey: '34WY6AJL1Dxwr14OeIjmaQ((',
    site: 'stackoverflow'
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOneAndUpdate({ stackexchangeId: profile.displayName }, function (err, user) {
            signale.success('user created with stackExchange');
            return done(err, user);
        });
    }
));

// Express routing
app.get('/auth/stack-exchange',
    passport.authenticate('stack-exchange'));

    app.get('/auth/stack-exchange/callback',
    passport.authenticate('stack-exchange'),
    function(req, res) {
        signale.success('stackoverflow auth successful!');
    });


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
function getFromStackApi(query) {
    axios.get(`http://api.stackexchange.com/2.2/answers?site=stackoverflow&tagged=${query}`)
        .then(function (res) {
            signale.success('res -> ', res.data);
            const params = {
                icon_emoji: ':wow:'
            };
            // Send message to ## Channel
            bot.postMessageToChannel('test', 'res.data', params);
        });
}

function sendToChannel(answer) {

};

app.listen(process.env.PORT || 5000);