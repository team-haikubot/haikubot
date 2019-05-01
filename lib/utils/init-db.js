require('./connect')();
const request = require('superagent');
// const app = require('../app');



const fivesArray = [
  'he saw razor teeth', 'easy, take a breath', 'water soothes her soul', 'distract the guards, please', 'goblins love parties', 'roll the die, you nerd', 'I`m a bad daughter', 'I have no money', 'exploring caverns', 'cuddle with your eyes', 'were you not sleeping', 'love spells never work', 'underwater acrobat', 'ceremoniously', 'running in the dark', 'sand in a jock strap', 'this is how you die', 'look into my eyes', 'she races through time', 'lilting melodies', 'humanoid mushrooms', 'flying danger snake', 'I will speak slowly', 'psychic hands tremble', 'dungeons and dragons', 'robe and wizard hat', 'finally, the sun!', 'they fly through their dreams', 'I`m invisible', 'dancing in shadows', 'smoke curls from her lips', 'rarely productive', 'don`t stop believing', 'flag raised; board that ship!', 'broken orchestra', 'halfling assassin', 'I ate your flowers', 'rolling in the mud', 'don`t say Pi is three', 'gross, mathematics', 'impossible love', 'alien breakfast', 'panthers prowl at dusk', 'what is mayonaise?', 'Earth bound invaders', 'walking with rhythm', 'upside down kitten', 'you cannot tap dance', 'stay in the pocket', 'I am not quitting', 'player piano', 'he died; so it goes', 'tail to tail cuddles', 'what does "this" mean now?', 'is "this" punishment?', 'trapped in promise hell', 'bouncing on the bus', 'changing perspective', 'creativity', 'tabula rasa', 'alphabet noodles', 'drastic precautions', 'wary of Kraft cheese', 'one more step forward', 'get out of my head', 'an evil grin spreads', 'provoking deep thoughts', 'road rage minutiae', 'clutch the walking stick', 'champion of art', 'hanging from a bridge', 'alchemy code labs'
];
const sevensArray = [
  'trees are not silly creatures', 'the sound of keyboards clicking', 'No grandma, I`m not dating', 'miracles are made of plums', 'bag of magical items', 'oh no, he`s speaking dwarvish', 'grandparents smell like cookies', 'kittens lovingly nuzzle', 'asleep with my eyes open', 'making a beautiful wreath', 'do you think they can hear me?', 'farting in elevators', 'sweet voices of the sirens', 'she studies by candlelight', 'organized anarchism', 'photosynthesis: breathing', 'seeking spirit animals', 'pillow fight academy', 'jolly pirates sail on by', 'astronaut ballerina', 'observe the ochre sunset', 'non-sequitur relations', 'woken up by babbling streams', 'like living in a desert', 'refactoring gross old code', 'Saturday Morning Math team', 'loquacious conversation', 'silly string meditation', 'teenage romance ends in death', 'anything to distract me', 'sunrise over the mountain'
];

function seedFives() {
//map through array of fives
  fivesArray.map(item => {
    return request
      .post('/api/v1/auth/signin')
      .send({
        username: 'Marty-Admin',
        password: 'trustno1'
      })
      .then(user => {
        return request
          .post('/api/v1/fives')
          .set('Authorization', `Bearer ${user.body.token}`)
          .send({
            text: item,
            source: user.body.user._id
          });
        //for every item in array
        //sign in existing user
        //post a five to the db
      });
  });
}

seedFives();
// function seedSevens() {


// }

// // function createFive(five, token) {
// //   return request
// //     .post('/api/v1/fives')
// //     .set('Authorization', `Bearer ${token}`)
// //     .send({ five });
// // }

// // function createSeven(seven, token) {
// //   return request
// //     .post('/api/v1/sevens')
// //     .set('Authorization', `Bearer ${token}`)
// //     .send({ seven });
// // }

// // function seedDB() {
// //   return request
// //     .post('/api/v1/auth/signup')
// //     .send({
// //       username: 'Marty-Admin',
// //       password: 'trustno1'
// //     })
// //     .then(res => {
// //       //res{ body: { token, user } }
      
// //       const fivesStorage = [...Array(fivesArray.length)].map(i => createFive({
// //         text: fivesArray[i],
// //         source: res.body.user._id,
// //       }, res.body.token));
  
// //       const sevensStorage = [...Array(sevensArray.length)].map(i => createSeven({
// //         text: sevensArray[i],
// //         source: res.body.user._id,
// //       }, res.body.token));
        
// //     });
// // }

// seedDB();
