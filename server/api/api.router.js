'use strict';
const passport = require('passport');

const router = require('express').Router();

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

router.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

module.exports = router;
