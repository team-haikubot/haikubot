const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');

function cleanDatabase() {
  return mongoose.connection.dropCollection('haikus', (err, result) => {
    if(err) {throw err;
    } else {
      console.log('Cleared stored haikus');
    }
  });
}

module.exports = cleanDatabase;
