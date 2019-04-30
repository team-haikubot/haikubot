require('dotenv').config();
const Haiku = require('../../lib/models/Haiku');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

describe('Haiku Routes Test', () => {
  beforeAll(() => {
    return connect();
  });  
          
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a haiku from get route and returns to user', () => {
    return request(app)
      .get('/api/v1/haikus')
      .then(haiku => {
        expect(haiku.body).toEqual({
          _id: expect.any(String),
          text: expect.any(String)
        });
      });     
  });
});
