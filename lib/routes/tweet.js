const { Router } = require('express');
const { postTweet } = require('../utils/twitter-api');
const Haiku = require('../models/Haiku');

module.exports = Router()
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Haiku
      .findById(id)
      .then(({ text }) => postTweet(text))
      .then(() => console.log('tweet successfully tweeted'))
      .catch(next);
  });
