const mongoose = require('mongoose');
require('../models/Five');
require('../models/Seven');

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

haikuSchema.statics.makeHaiku = function() {
  return this.model('Five').aggregate([
    { $sample: { size: 2 } }
  ])
    .then(fives => {
      return Promise.all([ 
        Promise.resolve(fives), 
        this.model('Seven').aggregate([
          { $sample: { size: 1 } }
        ])
      ]);  
    })
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

const Haiku = mongoose.model('Haiku', haikuSchema);
module.exports = Haiku;
