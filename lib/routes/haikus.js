const { Router } = require('express');
const Haiku = require('../models/Haiku');

module.exports = Router()
  .get('/', (req, res, next) => {
    Haiku.makeHaiku()
      .then(haiku => {
        const leanHaiku = {
          _id: haiku._id,
          text: haiku.text
        };
        res.send(leanHaiku);
      })
      .catch(next);
  });
