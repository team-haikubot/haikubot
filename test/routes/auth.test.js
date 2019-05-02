require('../data-helpers');
const request = require('supertest');
const User = require('../../lib/models/User');
const app = require('../../lib/app');

describe('Auth Routes Tests', () => {

  it('signs-up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'spicy',
        password: 'ham'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            __v: 0,
            _id: expect.any(String),
            username: 'spicy',
          }, token: expect.any(String)
            
        });
      });
  }); 
  
  it('signs in a user', () => {
    return User.create({
      username: 'spicy',
      password: 'ham'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            username: 'spicy',
            password: 'ham'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            __v: 0,
            _id: expect.any(String),
            username: 'spicy'
          }, token: expect.any(String)
        });
      });
  });

  it('can update an existing user by username', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'slowsloh',
        password: 'ham'
      })
      .then(res => {
        return request(app)
          .patch(`/api/v1/auth/${res.body.user.username}`)
          .set('Authorization', `Bearer ${res.body.token}`)
          .send({
            username: 'slowsloth'
          });
      })
      .then(updatedUser => {
        expect(updatedUser.body).toEqual({
          _id: expect.any(String),
          username: 'slowsloth'
        });
      });
  });

  it('can delete a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'slowsloh',
        password: 'ham'
      })
      .then(res => {
        return request(app)
          .delete(`/api/v1/auth/${res.body.user.username}`)
          .set('Authorization', `Bearer ${res.body.token}`)
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              username: 'slowsloh'
            });
          });
      });
  });
});
