require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('sevens routes tests', () => {
  it('can post a seven', () => {
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
          .post('/api/v1/sevens')
          .set('Authorization', `Bearer ${user.body.token}`)
          .send({
            text: 'why are you so mean to me!?'
          });
      })
      .then(seven => {
        expect(seven.body).toEqual({
          text: 'why are you so mean to me!?',
          _id: expect.any(String),
          __v: 0,
          tags: [],
          sentiment: expect.any(Number),
          source: expect.any(String)
        });
      });
  });
});
