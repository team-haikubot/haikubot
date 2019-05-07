require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');
const chance = require('chance').Chance();

describe('fives routes tests', () => {
  it('can post a five', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: chance.name(),
        password: 'ham'
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
          sentiment: expect.any(Number),
          source: expect.any(String)
        });
      });
  });

  it('errors on a curse word', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: chance.name(),
        password: 'ham'
      })
      
      .then(user => {
        return request(app)
          .post('/api/v1/fives')
          .set('Authorization', `Bearer ${user.body.token}`)
          .send({
            text: 'why are you so fuck!?'
          });
      })
      .then(five => {
        expect(five.error.status).toEqual(405);
      });
      
  });
});
