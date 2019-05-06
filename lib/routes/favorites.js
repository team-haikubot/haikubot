const { Router } = require('express');
const FavoriteHaiku = require('../../lib/models/FavoriteHaiku');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      haiku
    } = req.body;

    FavoriteHaiku
      .create({ haiku: haiku, favoritedBy: req.user._id })
      .then(favoriteHaiku => {
        res.send(favoriteHaiku);
      })
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    FavoriteHaiku
      .find({ favoritedBy: req.user._id })
      .populate('haiku')
      .then(favoriteHaikus => {
        return favoriteHaikus.map(res => {
          return res.haiku.text;
        });
      })
    //   .select({
    //     haiku: true
    //   })
    //   .lean()
      .then(favorites => res.send(favorites))
      .catch(next);
  });
