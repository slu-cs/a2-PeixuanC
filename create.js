

// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});

connect(); // To the database

const voters = [];
file.on('line', function(line) {
  const columns = line.split(',');
  voters.push(const voter = new Voter({
    first: columns[0],
    last: columns[1],
    zip: columns[2],
    history:colums[3]
  });
});

mongoose.connection.dropDatabase()
const saves = voters.map(d => d.save());

Promise.all(saves)
  .then(() => console.log('All saved'))
   .then(() => mongoose.connection.close())
   .then(() => console.log('Database is ready.'))
  .catch(error => console.log(error.stack));
