const mongoose = require('mongoose');

const sevenSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  source: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  twitterID: {
    type: String
  },
  tags: {
    type: [String],
    enum: ['Twitter', 'User']
  },
  sentiment: {
    type: Number
  }
});

const Seven = mongoose.model('Seven', sevenSchema);

module.exports = Seven;
