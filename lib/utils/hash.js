const bcrypt = require('bcryptjs');

function passwordHash(password) {
  return bcrypt.hash(password, 10);
}

function compare(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = { passwordHash, compare };
