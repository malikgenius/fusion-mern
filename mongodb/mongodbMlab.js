const mongoose = require('mongoose');
const db = require('../config/Keys').MONGO_URI;
// Simple mongoose.com to only open single connection to DB.

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(err => {
    console.log('mongoFullStackAuth Mlab is connected!');
  })
  .catch(err => {
    console.log('error:', err);
  });
