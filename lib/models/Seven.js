const mongoose = require('mongoose');

// removed some dead code
const sevenSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  source: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  sentiment: {
    type: Number
  }
});

const Seven = mongoose.model('Seven', sevenSchema);

module.exports = Seven;
