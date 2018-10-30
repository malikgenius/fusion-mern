const mongoose = require('mongoose');
const db = require('../config/Keys').mongoURI;
const Grid = require('gridfs-stream');
const fs = require('fs');
mongoose.Promise = global.Promise;
const passport = require('passport');

// if env= PRODUCTION it will use Prod Keys in Keys, and its all saved in env
// Simple mongoose.com to only open single connection to DB.
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(err => {
    console.log('mongoFullStackAuth is connected to local Fusion DB');
  })
  .catch(err => {
    console.log('error:', err);
  });
