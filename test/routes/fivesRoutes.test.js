require('../data-helpers');
const Five = require('../../lib/models/Five');
const request = require('supertest');
const app = require('../../lib/app');

describe('fives routes tests', () => {
  it('can post a five', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'testy@getoffmyback.com',
        username: 'spicy',
        password: 'ham',
        twitterHandle: 'yup'
      })
      
      .then(user => {
        return request(app)
          .post('/api/v1/fives')
          .set('Authorization', `Bearer ${user.body.token}`)
          .send({
            text: 'why are you so mean!?'
          });
      })
      .then(five => {
        expect(five.body).toEqual({
          text: 'why are you so mean!?',
          _id: expect.any(String),
          __v: 0,
          tags: [],
          sentiment: expect.any(Number),
          source: expect.any(String)
        });
      });
  });
});
