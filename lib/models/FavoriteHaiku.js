const mongoose = require('mongoose');

const favoriteHaikuSchema = new mongoose.Schema({
  favoritedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  haiku: {
    type: mongoose.Types.ObjectId,
    ref: 'Haiku',
    required: true
  }
});

const FavoriteHaiku = mongoose.model('FavoriteHaiku', favoriteHaikuSchema);

module.exports = FavoriteHaiku;
