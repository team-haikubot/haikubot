const { countSyllable } = require('../utils/count-syllable');

// A bit better error messaging to help users out.
const errorMessage = (syllables, expectedSyllables) => {
  const error = new Error(`Syllable count (${syllables}) incorrect. Expected ${expectedSyllables}`);
  error.status = 400;
  return error;
};

module.exports = (req, res, next) => {
  const syllables = countSyllable(req.body.text);
  if(req.body.text.toLowerCase().includes('robothaikubot')) {
    const error = new Error('You cannot add my name to my database');
    error.status = 400;
    next(error);
  } else if(req.baseUrl === '/api/v1/fives' && syllables !== 5) {
    next(errorMessage(syllables, 5));
  } else if(req.baseUrl === '/api/v1/sevens' && syllables !== 7) {
    next(errorMessage(syllables, 7));
  } else {
    next();
  }
};
