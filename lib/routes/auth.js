const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email, 
      username,
      password,
      twitterHandle
    } = req.body;

    User
      .create({ email, username, password, twitterHandle })
      .then(user => {
        const token = user.authToken();
        res.send({ user, token });
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const {
      username,
      password
    } = req.body;

    User
      .findOne({ username })
      .then(user => {
        if(!user) {
          const error = new Error('Username or password not found.');
          error.status = 401;
          return next(error);
        } 
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ])
          .then(([user, results]) => {
            if(!results) {
              const error = new Error('Username or password not found.');
              error.status = 401;
              next(error);
            } else {
              res.send({ token: user.authToken(), user });
            }
          }); 
      });
  });
