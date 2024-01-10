const mongoose = require("mongoose");

// single function to connect to mongodDB Database
function connectToDB(url) {
  return mongoose.connect(url);
}

module.exports = { connectToDB };