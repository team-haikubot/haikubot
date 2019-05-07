const { Router } = require('express');
const { getSentiment } = require('../utils/getSentiment');
const { ensureAuth } = require('../middleware/ensureAuth');
const syllableCountMW = require('../middleware/syllable-count');
const profanityFilter = require('../../lib/middleware/profanityFilter');
const Five = require('../models/Five');

module.exports = Router()
  .post('/', ensureAuth, profanityFilter, syllableCountMW, (req, res, next) => {
    const {
      text
    } = req.body;

    const sentimentScore = getSentiment(text);
    Five
      .create({ text, source: req.user._id, sentiment: sentimentScore })
      .then(five => res.send(five))
      .catch(next);     
  });
