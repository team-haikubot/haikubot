// create a file for twitter API stuff
// especially since you use the Twit package
// in multiple locations.
const Twit = require('twit');

const Tweet = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const startStream = track => {
  return Tweet.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
  })
    .then(() => {
      return Tweet.stream('statuses/filter', { track });
    });
};

const postTweet = text => {
  Tweet
    // eslint-disable-next-line
    .post('statuses/update', { status: text })
};


module.exports = {
  Tweet,
  startStream,
  postTweet
};
