const profanityFilter = require('../../lib/middleware/profanityFilter');

it('filters req.body.text for word', done => {
  const req = { body: { text: 'fuck you' } };
  const res = {};
  const next = () => {
    expect(req.error.message).toEqual('You cannot send curse words to the database.');
    done();
  };
  profanityFilter(req, res, next);
});
