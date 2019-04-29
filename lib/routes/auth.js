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
  });
