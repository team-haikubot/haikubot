require('../data-helpers');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../../lib/models/User');
const app = require('../../lib/app');

describe('Auth Routes Tests', () => {

  it('signs-up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'testy@getoffmyback.com',
        username: 'spicy',
        password: 'ham',
        twitterHandle: 'yup'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            __v: 0,
            _id: expect.any(String),
            email: 'testy@getoffmyback.com',
            username: 'spicy',
            twitterHandle: 'yup'
          }, token: expect.any(String)
            
        });
      });
  });   
});
