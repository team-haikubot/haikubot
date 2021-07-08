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

haikuSchema.statics.makeHaiku = function(sentiment = '') {
  if(!sentiment) {
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
  } else if(sentiment === '#neutral') {
    return this.model('Five').aggregate([
      {
        '$match': {
          'sentiment': 0
        }
      }, {
        '$sample': {
          'size': 2
        }
      }
    ])
      .then(fives => {
        return Promise.all([ 
          Promise.resolve(fives), 
          this.model('Seven').aggregate([
            {
              '$match': {
                'sentiment': 0
              }
            }, {
              '$sample': {
                'size': 1
              }
            }
          ])
        ]);  
      })
      .then(([fives, seven]) => {
        const haiku = `${fives[0].text} / ${seven[0].text} / ${fives[1].text}`;
        // eslint-disable-next-line no-console
        console.log(fives[0].sentiment, fives[1].sentiment, seven[0].sentiment);
        return this.create({
          firstFive: fives[0]._id,
          seven: seven[0]._id,
          secondFive: fives[1]._id,
          text: haiku
        });
      });
  } else if(sentiment === '#positive') {
    return this.model('Five').aggregate([
      {
        '$match': {
          'sentiment': {
            '$gt': 0
          }
        }
      }, {
        '$sample': {
          'size': 2
        }
      }
    ])
      .then(fives => {
        return Promise.all([ 
          Promise.resolve(fives), 
          this.model('Seven').aggregate([
            {
              '$match': {
                'sentiment': {
                  '$gt': 0
                }
              }
            }, {
              '$sample': {
                'size': 1
              }
            }
          ])
        ]);  
      })
      .then(([fives, seven]) => {
        const haiku = `${fives[0].text} / ${seven[0].text} / ${fives[1].text}`;
        // eslint-disable-next-line no-console
        console.log(fives[0].sentiment, fives[1].sentiment, seven[0].sentiment);
        return this.create({
          firstFive: fives[0]._id,
          seven: seven[0]._id,
          secondFive: fives[1]._id,
          text: haiku
        });
      });
  } else if(sentiment === '#negative') {
    return this.model('Five').aggregate([
      {
        '$match': {
          'sentiment': {
            '$lt': 0
          }
        }
      }, {
        '$sample': {
          'size': 2
        }
      }
    ])
      .then(fives => {
        return Promise.all([ 
          Promise.resolve(fives), 
          this.model('Seven').aggregate([
            {
              '$match': {
                'sentiment': {
                  '$lt': 0
                }
              }
            }, {
              '$sample': {
                'size': 1
              }
            }
          ])
        ]);  
      })
      .then(([fives, seven]) => {
        const haiku = `${fives[0].text} / ${seven[0].text} / ${fives[1].text}`;
        // eslint-disable-next-line no-console
        console.log(fives[0].sentiment, fives[1].sentiment, seven[0].sentiment);
        return this.create({
          firstFive: fives[0]._id,
          seven: seven[0]._id,
          secondFive: fives[1]._id,
          text: haiku
        });
      });
  }
};

const Haiku = mongoose.model('Haiku', haikuSchema);
module.exports = Haiku;
