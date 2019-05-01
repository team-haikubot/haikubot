const Twit = require('twit');
const keys = require('../../twitter-config');

const Tweet = new Twit(keys);
const tweetText = 'This is my first tweet. It is just a test, I say. Do not yell at me.';

Tweet
  .post('statuses/update', { status: tweetText }, function(err, data, response) {
    console.log('tweet successfully tweeted');
  });
