'use strict';
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const cors = require('cors'); // require it here

const app = express();

app.use(cors()); // enable CORS here
fccTesting(app);

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

//START_ASYNC -do not remove notes, place code between correct pair of notes.

bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(hash);

  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res); // -> false
  });
});

//END_ASYNC

//START_SYNC

var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);

var result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result); // -> true

//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});
