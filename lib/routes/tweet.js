require('dotenv').config();
const keys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
const Twit = require('twit');

const Tweet = new Twit(keys);
const tweetText = 'This tweet, my second, / is not as fun as the last. / Just ask Jan Brady.';

Tweet
  .post('statuses/update', { status: tweetText }, function(err, data, response) {
    console.log('tweet successfully tweeted');
  });
