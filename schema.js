// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a collection of professors
const Voter = new mongoose.Schema({
  first: String,
  last: String,
  zip: String,
  history: String
});



// Speed up queries on all fields
Voter.index({first: 1});
Voter.index({last: 1});
Voter.index({zip: 1});
Voter.index({history: 1});



module.exports = mongoose.model('Voter', Voters);
