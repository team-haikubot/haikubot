const badwords = require('badwords-list').array;

function profanityFilter(str) {
  const toFilter = str.toLowerCase();
  badwords.forEach(badword => {
    if(toFilter.includes(badword)) {
      const error = new Error('Profanity is not allowed');
      throw error;
    }
  });
}

module.exports = profanityFilter;
