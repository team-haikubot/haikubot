require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

describe('ensureAuth middleware', () => {
  it('can validate a good token', done => {
    const token = tokenize({
      username: 'lovely-laures'
    });

    const req = {
      token
    };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        username: 'lovely-laures'
      });
      done();
    };

    ensureAuth(req, res, next);
  });
});
