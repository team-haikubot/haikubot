require('dotenv').config();
require('./connect')();
const Haiku = require('../models/Haiku');
const Twit = require('twit');
const keys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
const Tweet = new Twit(keys);
Tweet.get('account/verify_credentials', {
  include_entities: false,
  skip_status: true,
  include_email: false
}, onAuthenticated);

function onAuthenticated(err, res) {
  if(err) {
    throw err;
  }

  console.log('Authentication successful. Running bot...\r\n');

  const stream = Tweet.stream('statuses/filter', { track: 'RobotHaikubot' });
  stream.on('tweet', tweetEvent);
  stream.on('error', onError);
  console.log('CAN YOU HEAR ME NOW?');
  
}
function tweetEvent(event) {
  const from = event.user.screen_name;
  console.log('I GOT A TWEET', from);
  Haiku.makeHaiku()
    .then(haiku => {
      return haiku.text;
    })
    .then(haiku => {
      Tweet
        .post('statuses/update', { status: `@${from}: ${haiku}` }, function(err, data, response) {
          console.log('tweet successfully tweeted:' + haiku);
        });
    })
    .catch(console.log);
}

function onError(error) {
  throw error;
}
