const badwords = require('badwords-list').array;

module.exports = (req, res, next) => {
  const str = req.body.text;
  const toFilter = str.toLowerCase();
  badwords.forEach(badword => {
    if(toFilter.includes(badword)) {
      const error = new Error('You cannot send curse words to the database.');
      error.status = 400;
      req.error = error;
      req.body.text = '';
      next(error);
    }
  });
};
