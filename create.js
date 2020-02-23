

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
  const str=columns[3];
  const election=[];
  while(str.length>0){
    election.push(str.substr(0,3));
    str=str.substr(3);
  }

  voters.push( new Voter({
    first: columns[0],
    last: columns[1],
    zip: columns[2],
    history:election,
  }));
});

file.on('close', function() {
  mongoose.connection.dropDatabase()
  .then(()=> Promise.all(voters.map(d => d.save())))
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.log(error.stack));
});
