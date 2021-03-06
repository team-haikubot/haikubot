const mongoose = require('mongoose');

const fiveSchema = new mongoose.Schema({
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

const Five = mongoose.model('Five', fiveSchema);

module.exports = Five;
