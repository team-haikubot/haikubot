// Really nice work here! It's impressive how much you did
// with a brand new API and pattern. Some minor refactors
// here to prevent duplicate code.
require('dotenv').config();
require('./connect')();
const request = require('superagent');
const Haiku = require('../models/Haiku');
const { startStream, postTweet } = require('./twitter-api');

startStream('RobotHaikubot')
  .then(stream => {
    console.log('Authentication successful. Running bot...\r\n');

    stream.on('tweet', tweetEvent);
    stream.on('error', err => {
      throw err;
    });
  });
function tweetEvent(event) {

  const from = event.user.screen_name;
  const text = event.text;

  const hashtags = event.entities.hashtags.map(object => {
    return `#${object.text.toLowerCase()}`;
  });

  const sentiment = hashtags.find(hashtag => {
    return hashtag === '#neutral' ||
      hashtag === '#positive' ||
      hashtag === '#negative';
  });

  if(!hashtags.includes('#five') && !hashtags.includes('#seven')) {
    tweetReply(from, sentiment);
  } else if(hashtags.includes('#five')) {
    sendToFives(text, hashtags);
  } else if(hashtags.includes('#seven')) {
    sendToSevens(text, hashtags);
  }
}

// create a function that can remove hashtags
// and other words from text. To do this I programatically
// created a regular expression. The big advantage to this
// is that this function is easy to test.
function sanitizeText(text, removeItems) {
  const pattern = new RegExp(removeItems.join('|'), 'g');
  return text.replace(pattern, '');
}

// create this function to prevent duplicate logic
function sendToModel(model, text, hashtags) {
  const sanitizedText = sanitizeText(text, [
    ...hashtags,
    '@RobotHaikubot',
    'RobotHaikubot'
  ]);

  return request
    .post(`${process.env.BASE_URL}/api/v1/auth/signin`)
    .send({
      username: process.env.ADMIN_LOGIN,
      password: process.env.TWITTER_SECRET
    })
    .then(user => {
      return request
        .post(`${process.env.BASE_URL}/api/v1/${model}`)
        .set('Authorization', `Bearer ${user.body.token}`)
        .send({
          text: sanitizedText,
          source: user.body.user._id
        });
    })
    .catch(console.log);
}

function sendToFives(text, hashtags) {
  return sendToModel('fives', text, hashtags);
}

function sendToSevens(text, hashtags) {
  return sendToModel('sevens', text, hashtags);
}

function tweetReply(from, sentiment) {
  Haiku.makeHaiku(sentiment)
    .then(haiku => haiku.text)
    .then(haiku => postTweet(`Hello @${from}! Here is your haiku:\r\n ${haiku}`))
    .catch(console.log);
}
