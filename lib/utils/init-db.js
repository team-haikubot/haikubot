require('dotenv').config();
require('./connect')();
const request = require('superagent');
const mongoose = require('mongoose');

const fivesArray = ['Can I pet your cat?',
  'Pop it open now',
  'Will your hand let go?',
  'Couch potato time',
  'She fell down a well',
  'Spectacularly',
  'The eyes look like dots',
  'In the hospital',
  'Like a rose in June',
  'Polaroid picture',
  'Like the morning dew',
  'Like a bag of cars',
  'Abracadabra!',
  'Like a cool moon breeze',
  'Your feet are stinky',
  'The chicken ate it',
  'Generousity',
  'Chicken or the egg?',
  'Tonight, pillow talk',
  'If you use a cane',
  'Palindromes are cool',
  'Turning Japanese',
  'Refridgerator',
  'Halloween candy',
  'Abominable',
  'Gentleman, your meal',
  'Shall I bathe you, dear?',
  'Illuminati',
  'Why are you so mean',
  'Deforestation',
  'Flowers in the wind',
  'Diabolical',
  'Kinda depressing',
  'You don’t understand',
  'I think he loves me',
  'Tea, letters, and love',
  'Perpendicular',
  'I’d like to go there',
  'If you’ve ever been',
  'You would not like it',
  'Leaves would also work',
  'Humiliation',
  'He lights up my life',
  'So what, i’ll smoke it',
  'Electricity',
  'Don’t throw that at me',
  'Unbelievable',
  'She killed him, it’s true',
  'Peanut butter time',
  'Big hair, she don’t care',
  'This is Melissa',
  'And the wedding ring',
  'He thinks I’m his slave',
  'Apocalypse',
  'I don’t trust her',
  'Thought she was my friend',
  'Don’t smoke cigarettes',
  'Mummification',
  'Marriage certificate',
  'Watch out, boiling hot',
  'No good, it sounds weird',
  'Now I’m a knockout!',
  'Big nose and short hair',
  'High school drama queen',
  'A question of style',
  'The popular crowd',
  'Pure like a baby',
  'That’s just how it works',
  'Bad relationship',
  'I’ve been eating it',
  'Back when we were kids',
  'The fresh mountain air',
  'It’s a voiceover',
  'The absurdity',
  'An auspicious day',
  'Lies, lies, it’s all lies',
  'Tammy ruined it',
  'High school reputation',
  'A beautiful swan',
  'An unhappy time',
  'Intently staring',
  'Call me ping pong head',
  'Near the rippling brook',
  'Don’t break my glasses',
  'Children and their toys',
  'Do better in school',
  'I do understand',
  'I’m a nice person',
  'Did you bring me cheese?',
  'Will Martha return?',
  'One, two, three, four, six',
  'Airplanes sometimes crash',
  'Airplanes are still cool',
  'What are they doing?',
  'Thousands of letters',
  'It’s very pretty',
  'A love connection',
  'A sacred password',
  'For all of time, dude',
  'No, you are stupid',
  'Family therapist',
  'Be that as it may',
  'Scars that people bear',
  'Seek all good feelings',
  'Make it difficult',
  'A sack of taters',
  'I’m pretty weepy',
  'Tell me something good',
  'He has confidence',
  'It’s a good price though',
  'Get an eyepatch man',
  'Its the next best thing',
  'Where does it come from',
  'populate models',
  'we need clean data',
  'lies without goodbye',
  'snuffleupagus',
  'this website is cool',
  'yes, yes, yes we can'];

const sevensArray = ['I feel like chicken tonight',
  'A bizarre underground cult',
  'There was definitely one',
  'They verified the presence',
  'Everything is a time warp',
  'Have you seen a dog eat poop?',
  'Eternity is not good',
  'There is popcorn in my teeth',
  'Invented the modern mall',
  'I used to be president',
  'Phantasma - Spanish for ghost',
  'She would like to talk to you',
  'Would you like to wear my shoes?',
  'It shall be utopia',
  'Nothing shelters more taxes',
  'I would walk five hundred miles',
  'I want to think of haikus',
  'If you’re her very best friend',
  'But he’s allergic to wheat',
  'I would like a panda please',
  'Would you like some sausages?',
  'There is nothing more to do',
  'I would like a garbage dress',
  'You work in the library',
  'The novelty music scene',
  'Why are you bigger than me',
  'I\'m not giving you compliments',
  'You\'re getting pretty freaky',
  'Don\'t worry about your lamp',
  'Goodbye sweet David Bowie',
  'Soaking in some hot water',
  'You\'re good at finding shortcuts',
  'Ashes to ashes, and dust',
  'it doesn\'t hurt to be small',
  'he\'s deep and passionate',
  'falling alseep sitting up',
  'its poetry in motion',
  'i havent thought of any',
  'Overflowing compost bin',
  'dipping donuts in coffee',
  'have you read my magazine',
  'whales are majestic creatures',
  'like a hairbrush in my hair',
  'boy, the sunset is pretty',
  'bees will take over the earth',
  'the taste of honey is nice',
  'you are sweeter than honey',
  'i like honey on my toast',
  'bother bees and you\'ll get stung',
  'dear father, thank you for love',
  'for the random things we say',
  'And the next one, delete it',
  'come on, what do you expect',
  'syllable count middleware',
  'go through that one, and that one',
  'it will be more similar',
  'copy over everything',
  'wow, i love watermelon'];

function seedFives() {
  Promise.all(
    fivesArray.map(item => {
      return request
        .post('https://pure-ravine-47428.herokuapp.com/api/v1/auth/signin')
        .send({
          username: 'Emily-Admin',
          password: 'trustno1'
        })
        .then(user => {
          return request
            .post('https://pure-ravine-47428.herokuapp.com/api/v1/fives')
            .set('Authorization', `Bearer ${user.body.token}`)
            .send({
              text: item,
              source: user.body.user._id
            });
        })
        .catch(console.log);
    })
  )
    .finally(() => mongoose.connection.close());
}

seedFives();

function seedSevens() {
  Promise.all(
    sevensArray.map(item => {
      return request
        .post('https://pure-ravine-47428.herokuapp.com/api/v1/auth/signin')
        .send({
          username: 'Emily-Admin',
          password: 'trustno1'
        })
        .then(user => {
          return request
            .post('https://pure-ravine-47428.herokuapp.com/api/v1/sevens')
            .set('Authorization', `Bearer ${user.body.token}`)
            .send({
              text: item,
              source: user.body.user._id
            });
        })
        .catch(console.log);
    })
  )
    .finally(() => mongoose.connection.close());
}

seedSevens();

