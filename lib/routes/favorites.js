const { Router } = require('express');
const FavoriteHaiku = require('../../lib/models/FavoriteHaiku');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      haiku
    } = req.body;

    FavoriteHaiku
      .create({ haiku: haiku, favoritedBy: req.user })
      .then(favoriteHaiku => {
        res.send(favoriteHaiku);
      })
      .catch(next);
  });
