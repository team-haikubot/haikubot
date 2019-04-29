const { countSyllable } = require('../../lib/utils/countSyllable');


describe('Syllable Count Tests', () => {
  it('will take a string of text and count 5 syllables', () => {
    const text = 'like the morning dew';
    const result = countSyllable(text);
    expect(result).toEqual(5);
    // const req = { text };
    // const res = {};
    // const next = () => {
    //   expect(req.body).toEqual(5);
    //   done();
    // };
    // countFive(req, res, next);
  });
});
