const { countSyllable } = require('../../lib/utils/countSyllable');

describe('Syllable Count Tests', () => {
  it('will take a string of text and count 5 syllables', () => {
    const text = 'like the morning dew';
    const result = countSyllable(text);
    expect(result).toEqual(5);
  });
});
