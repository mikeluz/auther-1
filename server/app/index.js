'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
const passport = require('passport');
const googleStrategy = require('../api/oauth/google');
const localStrategy = require('../api/oauth/local');

// "Enhancing" middleware (does not send response, server-side effects only)

app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool', // or whatever you like
  // these options are recommended and reduce session concurrency issues
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// "Responding" middleware (may send a response back to client)

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./statics.middleware'));

app.use(require('./error.middleware'));



module.exports = app;
