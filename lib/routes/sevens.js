const { Router } = require('express');
const { getSentiment } = require('../utils/getSentiment');
const { ensureAuth } = require('../middleware/ensureAuth');
const  syllableCountMW = require('../middleware/syllable-count');
const Seven = require('../models/Seven');

module.exports = Router()
  .post('/', ensureAuth, syllableCountMW, (req, res, next) => {
    const {
      text
    } = req.body;
    const sentimentScore = getSentiment(text);
    Seven
      .create({ text, source: req.user._id, sentiment: sentimentScore })
      .then(seven => res.send(seven))
      .catch(next);     
  });

