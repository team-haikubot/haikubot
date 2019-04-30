require('dotenv').config();
const Haiku = require('../../lib/models/Haiku');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

describe('Haiku Unit test', () => {
  beforeAll(() => {
    return connect();
  });  
      
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a haiku!', () => {
    return Haiku.makeHaiku()
      .then(haiku => {
        expect(haiku.toJSON()).toEqual({
          __v: 0,
          _id: expect.any(mongoose.Types.ObjectId),
          firstFive: expect.any(mongoose.Types.ObjectId),
          seven: expect.any(mongoose.Types.ObjectId),
          secondFive: expect.any(mongoose.Types.ObjectId),
          text: expect.any(String)
        });
      });
  });
});

