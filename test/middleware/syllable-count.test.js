const { countSyllable } = require('../../lib/utils/countSyllable');
const syllableCountMW = require('../../lib/middleware/syllable-count');

describe('Syllable Count Tests', () => {
  it('will take a string of text and count 5 syllables', () => {
    const text = 'like the morning dew';
    const result = countSyllable(text);
    expect(result).toEqual(5);
  });

  it('passes string along if path is 5 and syllable count is 5', done => {
    const text = 'like the morning dude';
    const req = { body: text, route:{ path: '/api/v1/fives' } };
    const res = {};
    const next = () => {
      expect(req.body).toEqual('like the morning dude');
      done();
    };
    syllableCountMW(req, res, next);
  });
  it('passes string along if path is 7 and syllable count is 7', done => {
    const text = 'like the morning dude ok';
    const req = { body: text, route:{ path: '/api/v1/sevens' } };
    const res = {};
    const next = () => {
      expect(req.body).toEqual('like the morning dude ok');
      done();
    };
    syllableCountMW(req, res, next);
  });

  it('returns error if path is 5 and syllable count is not 5', done => {
    const text = 'like the morning dude yo';
    const req = { body: text, route:{ path: '/api/v1/fives' } };
    const res = {};
    const next = (error) => {
      expect(error).toBeDefined();
      done();
    };
    syllableCountMW(req, res, next);
  });
});
