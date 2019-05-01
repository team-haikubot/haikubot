require('dotenv').config();
require('./connect')();
const request = require('superagent');
const mongoose = require('mongoose');

const fivesArray = [
  'I love my good friend',
  'The life we all live',
  'Orange vase, green leaf',
  'I took medicine',
  'Waiting for a train',
  'I must paint myself',
  'The early results',
  'Lots of work to do',
  'I shout from the door',
  'I shut the window',
  'Tentacles, shipmates',
  'See my truth, captain',
  'A child’s drawing',
  'The cat mewed demurely', 
  'Creamy peanut spread',
  'Nasal spray, headache',
  'Children can’t have toast',
  'The blue fox comes now',
  'Will you get the bill',
  'Wooden box, secrets',
  'She won’t say hello',
  'Plenty of good men',
  'Don’t pretend I won’t',
  'An owl’s gaze stops',
  'Literally all',
  'The field won’t grow grass',
  'Slap me harder please',
  'Without bees, we die',
  'A challenge, for sure',
  'You can have it all',
  'You can take it all',
  'You can catch these hands',
  'Ambiguity',
  'Overzealousness',
  'Unreachable, you',
  'You are unworthy',
  'I am unworthy',
  'I will always laugh',
  'I will always cry',
  'I will never laugh',
  'I will never cry',
  'You have a few faults',
  'I have a few faults',
  'Your flow is golden',
  'Look at you go, child',
  'Without you, I can’t',
  'Without you, I will',
  'Don’t talk back to me',
  'A lazy morning',
  'Without knowing it',
  'A lucky lady',
  'What a lucky lad',
  'I am a shark now',
  'First-ever drone flight',
  'I am bad at math',
  'I am bad at art',
  'I am good at math',
  'I am good at art',
  'I have a brother',
  'I have a sister',
  'I don’t have a friend',
  'I have a good friend',
  'I love McDonald\'s',
  'I hate McDonald\'s',
  'Get me some fries, please',
  'The guy won’t shut up',
  'If you want me to',
  'I would do it all',
  'An Egyptian princess',
  'She writes columns',
  'She gives good advice',
  'She gives bad advice',
  'You’re a mouthbreather',
  'You’re the funniest',
  'That gif was too long',
  'You’re a treasure, mom',
  'I can’t fix this bug',
  'Only five more hours',
  'Only eight more weeks',
  'Twenty times that much',
  'You will find me there',
  'You won’t find me there',
  'If that’s all there is',
  'Santa Claus himself',
  'No more trips Staples',
  'The words will write you',
  'Play along with me',
  'Every day is new',
  'Don’t look back at life',
  'Don’t look back at me',
  'Don’t stare at the sun',
  'He skipped towards the school',
  'Joyful as a hymn',
  'I should have swiped left',
  'Cut the pear, will you?',
  'If we’re sharing bread',
  'Let’s none of us speak',
  'The cactus grows high',
  'The sun is out now',
  'This is the end, babe',
  'Mascara meltdown',
  'Slow-motion free-fall'];

const sevensArray = ['The cat screamed in defiance',
  'Shadows danced all afternoon',
  'You can be most anything',
  'The Night’s Watch suck at watching',
  'A risk was calculated',
  'I met a squid yesterday',
  'Her name is Princess Kitty',
  'Cofounder of Kickstarter',
  'I want a painting by you',
  'I want to write a story',
  'Will you come sit next to me?',
  'I haven’t bathed in a week',
  'Don’t pretend you don’t notice',
  'I absolutely can’t wait',
  'Don’t forget to love yourself',
  'Charlatans, the whole damn lot',
  'What a bunch of bologna', 
  'The dogs pant incessantly', 
  'Disney-branded hooligans',
  'The dog looked back with contempt',
  'Snow-covered biotech drones',
  'Shake the dice and steal the rice',
  'Banana-split disaster',
  'You the plug or the outlet?',
  'U up bro? It’s me, ya boy',
  'Not everyone’s a poet',
  'Dismantle white supremacy',
  'Mmm mmm mmm mmm, that’s tasty',
  'Dog-like robots kill us all',
  'The boss and the assistant',
  'Come up and see me sometime',
  'The art on my walls is bad',
  'You’re just a hot mess of lies',
  'Extinction-level preschool',
  'Post-apocalyptic vibe',
  'Edgelords say: “Thanos was right”',
  'Piano keys, melodies',
  'Send me the link to your blog',
  'Coconut water, a scam',
  'Sunday morning hangover',
  'I got you a kimono',
  'Let’s open the kimono',
  'What lies beneath my bathrobe',
  'Booty-shakin’, earth-quakin’',
  'So, what color handkerchief?',
  'Are you friends with Dorothy?',
  'The house smells like chicken fries',
  'Kiss my shiny metal ass',
  'Shut up and take my money',
  'Terrycloth is for losers'];

function seedFives() {
  Promise.all(
    fivesArray.map(item => {
      return request
        .post('http://localhost:4242/api/v1/auth/signin')
        .send({
          username: 'Ben-Admin',
          password: 'trustno1'
        })
        .then(user => {
          return request
            .post('http://localhost:4242/api/v1/fives')
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
        .post('http://localhost:4242/api/v1/auth/signin')
        .send({
          username: 'Ben-Admin',
          password: 'trustno1'
        })
        .then(user => {
          return request
            .post('http://localhost:4242/api/v1/sevens')
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

