require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User Model test', () => {
  it('can create a new user', () => {
    const newUser = new User({
      username: 'Banana',
      password: 'testpw'
    });
    expect(newUser.toJSON()).toEqual({
      username: 'Banana',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has required fields', () => {
    const newUser = new User({
      email: 'test@email.net',
      password: 'testpw',
      twitterHandle: 'fakeTwitter'
    });
    const errors = newUser.validateSync().errors;
    expect(errors.username.message).toEqual('Path `username` is required.');
  });
});
