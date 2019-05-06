// no need to require the other modules
const mongoose = require('mongoose');
const { randomDocuments } = require('./haiku-aggregations');

const haikuSchema = new mongoose.Schema({
  firstFive: {
    type: mongoose.Types.ObjectId,
    ref: 'Five',
    required: true
  },
  seven: {
    type: mongoose.Types.ObjectId,
    ref: 'Seven',
    required: true
  },
  secondFive: {
    type: mongoose.Types.ObjectId,
    ref: 'Five',
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

// no need for default sentiment. If no sentiment is passed
// then sentiment will be undefined which  is fine
haikuSchema.statics.makeHaiku = function(sentiment) {
  // You can use Promise.all to get both the Fives and Sevens at the same time
  // Added some helper functions to clean up logic here
  return Promise.all([
    this.model('Five').aggregate(randomDocuments({ sentiment, size: 2 })),
    this.model('Seven').aggregate(randomDocuments({ sentiment }))
  ])
    .then(([fives, seven]) => {
      const haiku = `${fives[0].text} / ${seven[0].text} / ${fives[1].text}`;
      return this.create({
        firstFive: fives[0]._id,
        seven: seven[0]._id,
        secondFive: fives[1]._id,
        text: haiku
      });
    });
};

module.exports = mongoose.model('Haiku', haikuSchema);
