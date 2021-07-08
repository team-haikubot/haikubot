const mongoose = require('mongoose');

function cleanHaikuCollection() {
  return mongoose.connection.dropCollection('haikus', (err) => {
    if(err) {throw err;
    } else {
      // eslint-disable-next-line no-console
      console.log('Cleared stored haikus');
    }
  });
}

module.exports = cleanHaikuCollection;
