const mongoose = require('mongoose');

function cleanHaikuCollection() {
  return mongoose.connection.dropCollection('haikus', (err, result) => {
    if(err) {throw err;
    } else {
      console.log('Cleared stored haikus');
    }
  });
}

module.exports = cleanHaikuCollection;
