require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

describe('tweet routes', () => {
  beforeAll(() => {
    return connect();
  });  
              
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can get the haiku by id', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'Marty-Admin',
        password: 'trustno1'
      })
      .then(user => {
        return request(app)
          .get('/api/v1/haikus')
          .then(haiku => {
            return request(app)
              .get(`/api/v1/tweet/${haiku.body._id}`)
              .then(res => {
                  console.log(res.body.text);
                expect(res.body.text).toEqual(expect.any(String));
              });
          });
      });
  });

});
