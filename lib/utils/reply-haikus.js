require('dotenv').config();
require('./connect')();
const request = require('superagent');
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
// eslint-disable-next-line no-unused-vars
function onAuthenticated(err, res) {
  if(err) {
    throw err;
  }

  console.log('Authentication successful. Running bot...\r\n');

  const stream = Tweet.stream('statuses/filter', { track: 'RobotHaikubot' });
  stream.on('tweet', tweetEvent);
  stream.on('error', onError);  
}
function tweetEvent(event) {

  const from = event.user.screen_name;
  const text = event.text;
  const hashtags = event.entities.hashtags.map(object => {
    return `#${object.text}`;
  });
  if(!hashtags.includes('#five') && !hashtags.includes('#seven')) {
    tweetReply(from); 
  } else if(hashtags.includes('#five')) {
    sendToFives(text, hashtags);
  } else if(hashtags.includes('#seven')) {
    sendToSevens(text, hashtags);
  }
  
}

function onError(error) {
  throw error;
}

function sendToFives(text, hashtags) {
  let newText = text;
  hashtags.forEach(word => {
    newText = newText.replace(word, '');
  });
  newText = newText.replace('@RobotHaikubot', '')
    .replace('RobotHaikubot', '')
    .replace('#five', '')
    .replace('#seven', '');

  return request
    .post(`${process.env.BASE_URL}/api/v1/auth/signin`)
    .send({
      username: process.env.ADMIN_LOGIN,
      password: process.env.TWITTER_SECRET
    })
    .then(user => {
      return request
        .post(`${process.env.BASE_URL}/api/v1/fives`)
        .set('Authorization', `Bearer ${user.body.token}`)
        .send({
          text: newText,
          source: user.body.user._id
        });
    })
    .catch(console.log);
}

function sendToSevens(text, hashtags) {
  let newText = text;
  hashtags.forEach(word => {
    newText = newText.replace(word, '');
  });
  newText = newText.replace('@RobotHaikubot', '')
    .replace('RobotHaikubot', '')
    .replace('#five', '')
    .replace('#seven', '');
  
  return request
    .post(`${process.env.BASE_URL}/api/v1/auth/signin`)
    .send({
      username: process.env.ADMIN_LOGIN,
      password: process.env.TWITTER_SECRET
    })
    .then(user => {
      return request
        .post(`${process.env.BASE_URL}/api/v1/sevens`)
        .set('Authorization', `Bearer ${user.body.token}`)
        .send({
          text: newText,
          source: user.body.user._id
        });
    })
    .catch(console.log);
}


function tweetReply(from) {
  Haiku.makeHaiku()
    .then(haiku => {
      return haiku.text;
    })
    .then(haiku => {
      Tweet
      // eslint-disable-next-line no-unused-vars
        .post('statuses/update', { status: `@${from}: ${haiku}` }, function(err, data, response) {
          console.log('tweet successfully tweeted:' + haiku);
        });
    })
    .catch(console.log);
}
