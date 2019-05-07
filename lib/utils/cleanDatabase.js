const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');

module.exports = function cleanDatabase() {
  return connect()
    .then(() => {
      return mongoose.connection.dropCollection('haikus', (err, result) => {
        if(err) {throw err;
        } else {
          console.log('Cleared stored haikus');
        }
      })
        .then(mongoose.connection.close());
    });
};
