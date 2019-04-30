const { getSentiment } = require('../../lib/utils/getSentiment');

describe('Sentiment Test', () => {
  it('gets a sentiment score from text', () => {
    const text = 'a bro in patagonia';
    const result = getSentiment(text);
    console.log('sentiment', result);
    expect(result).toEqual(expect.any(Number));
  });
});
