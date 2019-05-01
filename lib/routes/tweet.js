require('dotenv').config();
const { Router } = require('express'); 
const keys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
const Twit = require('twit');
const Haiku = require('../models/Haiku');
const Tweet = new Twit(keys);

module.exports = Router()
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Haiku
      .findById(id)
      .then(haiku => {
        const tweetText = haiku.text;
        Tweet
          .post('statuses/update', { status: tweetText }, function(err, data, response) {
            console.log('tweet successfully tweeted');
          });
      })
      .catch(next);
      
  });

