const Sentiment = require('sentiment');
const sentiment = new Sentiment();

function getSentiment(text) {
  const result = sentiment.analyze(text);
  return result.score;
}

module.exports = {
  getSentiment
};
