const syllable = require('syllable');

function countSyllable(text) {
  let syllableCount = 0;
  const wordArray = text.split(' ');
  wordArray.map(word => {
    syllableCount += syllable(word);
  });
  console.log(syllableCount)
  return syllableCount;
}

module.exports = {
  countSyllable,
};
