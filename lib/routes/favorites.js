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
  })

  .get('/', ensureAuth, (req, res, next) => {
    FavoriteHaiku
      .find({ favoritedBy: req.user._id })
      .then(favorites => res.send(favorites))
      .catch(next);
  });
