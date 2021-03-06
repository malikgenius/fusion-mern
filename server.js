const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const fs = require('fs');
const path = require('path');

// if env=PRODUCTION mongodb will use MONGOURI which is saved in env if not production it will take it from dev keys.
require('./mongodb/mongodb');
// web-push for push notifications

//Routes

const users = require('./routes/api/users/users');
const reset_verify = require('./routes/api/users/reset_verify');
const stock = require('./routes/api/stock/stock');
const upload = require('./routes/api/stock/uploadRoute');

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(passport.initialize());

//Passport Jwt Strategy, Google & Facebook
// require('./passport/passport');

// Grid init

//Logging
app.use(morgan('combined'));
app.use(
  morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
  })
);

// CORS Allowed, if app sends request to thirdparty we need CORS or will get an error.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Routes
// app.use('/api/push', push);
app.use('/api/users', users);
app.use('/api/reset', reset_verify);
app.use('/api/stock', stock);
app.use('/api/upload', upload);

// app.use(express.static('public'));
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // if we use multer to save images in public folder, thats how we will access them from the client.
  // multer should save the imageurl address similar to this.
  //https://sheltered-anchorage-84432.herokuapp.com/1.jpg     where 1.jpg is saved in public folder or any other we specify.
  // app.use(express.static('public'));
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Schedule to send emails and SMS to users on specific date.
// require('./notifications/email-scheduler');
// require('./notifications/sms-twillio-scheduler');
// require("./notifications/email-schedular-1day-advance");
// require("./notifications/datetest");

const port = process.env.PORT || 5000;
const Environment = process.env.NODE_ENV;
app.listen(port, err => {
  if (err) {
    return console.log(`Error: ${err}`);
  }
  if (process.env.NODE_ENV === 'production') {
    console.log(`Stock App is in Production ENV & listening on ${port}`);
  } else {
    console.log(`local Dev environment loaded, listening on ${port}`);
  }
});
