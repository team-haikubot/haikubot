require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

describe('Favorites Routes Test', () => {
  beforeAll(() => {
    return connect();
  });  
          
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posting a haiku as a favorite', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'testy@getoffmyback.com',
        username: 'spicy',
        password: 'ham',
        twitterHandle: 'yup'
      })
      .then(user => {
        return request(app)
          .get('/api/v1/haikus')
          .then(haiku => {
            return request(app)
              .post('/api/v1/favorites')
              .set('Authorization', `Bearer ${user.body.token}`)
              .send({
                haiku: haiku.body._id
              });
          });
      })
      .then(favorite => {
        expect(favorite.body).toEqual({
          _id: expect.any(String),
          favoritedBy: expect.any(String),
          haiku: expect.any(String),
          __v: 0
        });
      });
  });

  it('can GET all favorited haikus for a user', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'testy@getoffmyback.com',
        username: 'spicy',
        password: 'ham',
        twitterHandle: 'yup'
      })
      .then(user => {
        return request(app)
          .get('/api/v1/favorites')
          .set('Authorization', `Bearer ${user.body.token}`)
          .then(favorites => {
            expect(favorites.body).toHaveLength(81);
          });
      });
  });
        
});
