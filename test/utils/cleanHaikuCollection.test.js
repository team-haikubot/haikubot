const app = require('../../lib/app');
const request = require('supertest');
const cleanHaikuCollection = require('../../lib/utils/cleanHaikuCollection');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const Haiku = require('../../lib/models/Haiku');

it('creates a haiku from get route and returns to user,then uses cleanDatabase to empty the haiku collection', () => {
  return connect()
    .then(() => {
      return request(app)
        .get('/api/v1/haikus');
    })
    .then(added => {
      expect(added.body._id).toEqual(expect.any(String));
    })
    .then(() => {
      return cleanHaikuCollection();
    })
    .then(() => {
      return Haiku
        .find()
        .then(haikus => {
          expect(haikus).toHaveLength(0);
        });
    })
    .then(() => {
      return mongoose.connection.close();
    });
});
