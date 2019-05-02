require('dotenv').config();
require('./connect')();
const Haiku = require('../models/Haiku');
const Twit = require('twit');
const keys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
const Tweet = new Twit(keys);
Tweet.get('account/verify_credentials', {
  include_entities: false,
  skip_status: true,
  include_email: false
}, onAuthenticated);

function onAuthenticated(err, res) {
  if(err) {
    throw err;
  }

  console.log('Authentication successful. Running bot...\r\n');

  const stream = Tweet.stream('statuses/filter', { track: 'RobotHaikubot' });
  stream.on('tweet', tweetEvent);
  stream.on('error', onError);
  console.log('CAN YOU HEAR ME NOW?');
  
}
function tweetEvent(event) {
  console.log(event);
  //get the text from the event 
  //check if five or seven is in the hashtag array
  //if not -> send tweet reply
  //if so ->
  //if five,
  //remove @ from text
  //remove RobotHaikubot fro texts
  //remove hashtags from text
  //login as RobotHaikubot
  //send text to fives route wit
  //if seven,
  //ditto
  const from = event.user.screen_name;
  const text = event.text;
  const hashtags = event.entities.hashtags.map(object => {
    return `#${object.text}`;
  });
  if(!hashtags.includes('#five') && !hashtags.includes('#seven')) {
    tweetReply(from); 
  } else if(hashtags.includes('#five')) {
    console.log('HEY LOOK YOU MADE IT');
    sendToFives(text, hashtags);
  } else if(hashtags.includes('#seven')) {
    //login send to seven
  }


  //   console.log('event', event);
  //   console.log('hashtags', event.entities.hashtags);
  
}

function onError(error) {
  throw error;
}
function sendToFives(text, hashtags) {
  let newText = text;
  console.log('text', text);
  console.log('hashtags', hashtags);
  hashtags.forEach(word => {
    newText = newText.replace(word, '');
  });
  newText = newText.replace('@RobotHaikubot', '')
    .replace('RobotHaikubot', '')
    .replace('#five', '')
    .replace('#seven', '');

  console.log(newText);

  //remove @RobotHaikubot
  //remove RobotHaikubot
  //remove ANY #TaG <<--
  //Sign in to app with Robot
  //Post to fives route
  //Be awesome
}


function tweetReply(from) {
  console.log('I GOT A TWEET', from);
  Haiku.makeHaiku()
    .then(haiku => {
      return haiku.text;
    })
    .then(haiku => {
      Tweet
        .post('statuses/update', { status: `@${from}: ${haiku}` }, function(err, data, response) {
          console.log('tweet successfully tweeted:' + haiku);
        });
    })
    .catch(console.log);
}
