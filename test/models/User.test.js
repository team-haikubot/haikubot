require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User Model test', () => {
    it('can create a new user', () => {
        const newUser = new User({
            email: 'test@email.net',
            username: 'Banana',
            password: 'testpw',
            twitterHandle: 'fakeTwitter'
        });
        expect(newUser.toJSON()).toEqual({
            email: 'test@email.net',
            username: 'Banana',
            twitterHandle: 'fakeTwitter',
            _id: expect.any(mongoose.Types.ObjectId)
        });

    });
})