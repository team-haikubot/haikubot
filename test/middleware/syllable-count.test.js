const { countFive, countSeven } = require('../../lib/middleware/syllable-count');


describe('Syllable Count Tests', () => {
  it('will take a string of text and count 5 syllables', done => {
    const text = 'like the morning dew';

    const req = { text };
    const res = {};
    const next = () => {
      expect(req.body).toEqual(5);
      done();
    };
    countFive(req, res, next);
  });
});
