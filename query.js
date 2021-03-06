// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

/*// What documents are in the collection?
const query = Professor.find();
query.exec(function(error, professors) {
  if (error) console.error(error.stack);
  console.log(professors);
});*/

const queries = [

  //How many registered voters live in the Canton zip code (13617)?

  Voter.find().where('zip').equals("13617"),
  //What are the full names of all the registered voters whose first-name is STARR?
  Voter.find().where('first').equals("STARR"),
  //How many people voted in the 2016 general election (GE16)?
  //use regular expression to find the string of history conationing GE16
  Voter.find({"history":/GE16/}),
  //What is the last-name that comes last in the county in alphabetical order?
  Voter.find().sort('-last').limit(1),
  //How many zip codes does the county contain?
  Voter.distinct('zip'),




];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('# of voter of 13617: ', results[0].length);
    console.log('full names of all the registered voters whose first-name is STARR: ', results[1].map(p => p.first+" "+p.last));
    console.log('# of people voted in the 2016:', results[2].length);
   console.log('the last-name that comes last in the county in alphabetical order', results[3].map(p => p.first+" "+p.last));
    console.log('Distinct zip: ', results[4].length);
    
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
