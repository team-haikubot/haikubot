require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');
const cleanHaikuCollection = require('./lib/utils/cleanHaikuCollection');

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  setInterval(() => {
    cleanHaikuCollection();
  }, (1000 * 60 * 60 * 24 * 7));
  // eslint-disable-next-line no-console
  console.log(`LISTENING on ${PORT}`);
});
